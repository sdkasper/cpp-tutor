import { createClient, type Client } from '@libsql/client';
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from './schema.js';

let _client: Client | null = null;
let _db: LibSQLDatabase<typeof schema> | null = null;

function getClient(): Client {
	if (!_client) {
		const url = (process.env.TURSO_DATABASE_URL ?? 'file:data/cpp-tutor.db').trim();
		console.log(`Creating Turso client: ${url.replace(/(:\/\/.{4}).*(@)/, '$1***$2')}`);
		_client = createClient({
			url,
			authToken: process.env.TURSO_AUTH_TOKEN?.trim()
		});
	}
	return _client;
}

export function getDb(): LibSQLDatabase<typeof schema> {
	if (!_db) {
		_db = drizzle(getClient(), { schema });
	}
	return _db;
}

// Keep backward-compatible export that lazily initializes
export const db = new Proxy({} as LibSQLDatabase<typeof schema>, {
	get(_target, prop) {
		return (getDb() as any)[prop];
	}
});

export async function initDb() {
	await getClient().executeMultiple(`
		CREATE TABLE IF NOT EXISTS students (
			id TEXT PRIMARY KEY,
			name TEXT NOT NULL UNIQUE,
			created_at TEXT NOT NULL,
			last_active TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS problems (
			id TEXT PRIMARY KEY,
			slug TEXT NOT NULL,
			title TEXT NOT NULL,
			difficulty TEXT NOT NULL DEFAULT 'beginner',
			description TEXT NOT NULL,
			hints TEXT NOT NULL DEFAULT '[]',
			solution_notes TEXT NOT NULL DEFAULT '',
			starter_code TEXT NOT NULL DEFAULT '',
			source_type TEXT NOT NULL DEFAULT 'markdown',
			source_ref TEXT NOT NULL DEFAULT '',
			sort_order INTEGER NOT NULL DEFAULT 0,
			concepts TEXT NOT NULL DEFAULT '[]',
			lang TEXT NOT NULL DEFAULT 'en'
		);

		CREATE TABLE IF NOT EXISTS student_progress (
			student_id TEXT NOT NULL REFERENCES students(id),
			problem_id TEXT NOT NULL REFERENCES problems(id),
			status TEXT NOT NULL DEFAULT 'not_started',
			current_code TEXT NOT NULL DEFAULT '',
			hints_used INTEGER NOT NULL DEFAULT 0,
			started_at TEXT,
			completed_at TEXT,
			PRIMARY KEY (student_id, problem_id)
		);

		CREATE TABLE IF NOT EXISTS conversations (
			id TEXT PRIMARY KEY,
			student_id TEXT NOT NULL REFERENCES students(id),
			problem_id TEXT NOT NULL REFERENCES problems(id),
			created_at TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS messages (
			id TEXT PRIMARY KEY,
			conversation_id TEXT NOT NULL REFERENCES conversations(id),
			role TEXT NOT NULL,
			content TEXT NOT NULL,
			created_at TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS url_credentials (
			id TEXT PRIMARY KEY,
			domain TEXT NOT NULL UNIQUE,
			auth_type TEXT NOT NULL,
			credentials TEXT NOT NULL DEFAULT '{}'
		);

		CREATE TABLE IF NOT EXISTS lessons (
			id TEXT PRIMARY KEY,
			slug TEXT NOT NULL,
			title TEXT NOT NULL,
			sort_order INTEGER NOT NULL DEFAULT 0,
			concepts TEXT NOT NULL DEFAULT '[]',
			summary TEXT NOT NULL DEFAULT '',
			estimated_minutes INTEGER NOT NULL DEFAULT 10,
			content TEXT NOT NULL,
			prev_lesson TEXT,
			next_lesson TEXT,
			source_ref TEXT NOT NULL DEFAULT '',
			lang TEXT NOT NULL DEFAULT 'en'
		);

		CREATE TABLE IF NOT EXISTS lesson_progress (
			student_id TEXT NOT NULL REFERENCES students(id),
			lesson_id TEXT NOT NULL REFERENCES lessons(id),
			status TEXT NOT NULL DEFAULT 'not_started',
			started_at TEXT,
			completed_at TEXT,
			PRIMARY KEY (student_id, lesson_id)
		);
	`);

	// Add columns if they don't exist (backward-compatible migrations)
	const migrations = [
		"ALTER TABLE problems ADD COLUMN concepts TEXT NOT NULL DEFAULT '[]'",
		"ALTER TABLE problems ADD COLUMN lang TEXT NOT NULL DEFAULT 'en'",
		"ALTER TABLE lessons ADD COLUMN lang TEXT NOT NULL DEFAULT 'en'"
	];
	for (const sql of migrations) {
		try { await getClient().execute(sql); } catch { /* already exists */ }
	}

	// Recreate tables to drop UNIQUE constraint on slug (needed for multi-lang).
	// SQLite doesn't support DROP CONSTRAINT, so we rename → recreate → copy → drop.
	// This is idempotent: if the table already lacks the UNIQUE constraint, the
	// index check returns nothing and we skip.
	for (const table of ['problems', 'lessons']) {
		try {
			const indexes = await getClient().execute(`PRAGMA index_list(${table})`);
			const hasUniqueSlug = indexes.rows.some((r: any) =>
				r.unique === 1 && String(r.name).includes('slug')
			);
			if (!hasUniqueSlug) continue;

			// Check for auto-generated unique index on slug
			const indexInfo = await getClient().execute(
				`SELECT sql FROM sqlite_master WHERE type='index' AND tbl_name='${table}' AND sql LIKE '%slug%'`
			);
			if (indexInfo.rows.length === 0) {
				// UNIQUE constraint is inline (from CREATE TABLE), need to recreate table
				const cols = table === 'problems'
					? 'id, slug, title, difficulty, description, hints, solution_notes, starter_code, source_type, source_ref, sort_order, concepts, lang'
					: 'id, slug, title, sort_order, concepts, summary, estimated_minutes, content, prev_lesson, next_lesson, source_ref, lang';

				const createSql = table === 'problems'
					? `CREATE TABLE ${table}_new (
						id TEXT PRIMARY KEY, slug TEXT NOT NULL, title TEXT NOT NULL,
						difficulty TEXT NOT NULL DEFAULT 'beginner', description TEXT NOT NULL,
						hints TEXT NOT NULL DEFAULT '[]', solution_notes TEXT NOT NULL DEFAULT '',
						starter_code TEXT NOT NULL DEFAULT '', source_type TEXT NOT NULL DEFAULT 'markdown',
						source_ref TEXT NOT NULL DEFAULT '', sort_order INTEGER NOT NULL DEFAULT 0,
						concepts TEXT NOT NULL DEFAULT '[]', lang TEXT NOT NULL DEFAULT 'en'
					)`
					: `CREATE TABLE ${table}_new (
						id TEXT PRIMARY KEY, slug TEXT NOT NULL, title TEXT NOT NULL,
						sort_order INTEGER NOT NULL DEFAULT 0, concepts TEXT NOT NULL DEFAULT '[]',
						summary TEXT NOT NULL DEFAULT '', estimated_minutes INTEGER NOT NULL DEFAULT 10,
						content TEXT NOT NULL, prev_lesson TEXT, next_lesson TEXT,
						source_ref TEXT NOT NULL DEFAULT '', lang TEXT NOT NULL DEFAULT 'en'
					)`;

				await getClient().executeMultiple(`
					${createSql};
					INSERT INTO ${table}_new (${cols}) SELECT ${cols} FROM ${table};
					DROP TABLE ${table};
					ALTER TABLE ${table}_new RENAME TO ${table};
				`);
				console.log(`Migrated ${table}: removed UNIQUE constraint on slug`);
			}
		} catch (e) {
			console.log(`Migration check for ${table}:`, e);
		}
	}
}
