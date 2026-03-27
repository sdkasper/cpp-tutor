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
	const colMigrations = [
		"ALTER TABLE problems ADD COLUMN concepts TEXT NOT NULL DEFAULT '[]'",
		"ALTER TABLE problems ADD COLUMN lang TEXT NOT NULL DEFAULT 'en'",
		"ALTER TABLE lessons ADD COLUMN lang TEXT NOT NULL DEFAULT 'en'"
	];
	for (const sql of colMigrations) {
		try { await getClient().execute(sql); } catch { /* already exists */ }
	}

	// One-time migration: recreate problems/lessons without UNIQUE slug constraint.
	// The original schema had `slug TEXT NOT NULL UNIQUE` which blocks multi-lang rows
	// (same slug, different lang). SQLite has no DROP CONSTRAINT, so we rename → create
	// new → copy → drop old. Skips PRAGMA detection (unreliable on Turso/libSQL).
	const client = getClient();
	try {
		await client.execute('CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY)');
		const done = await client.execute("SELECT 1 FROM _migrations WHERE name = 'remove_unique_slug_v2'");
		if (done.rows.length === 0) {
			for (const table of ['problems', 'lessons'] as const) {
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

				await client.executeMultiple(`
					DROP TABLE IF EXISTS ${table}_new;
					${createSql};
					INSERT INTO ${table}_new (${cols}) SELECT ${cols} FROM ${table};
					DROP TABLE ${table};
					ALTER TABLE ${table}_new RENAME TO ${table};
				`);
				console.log(`Migrated ${table}: removed UNIQUE constraint on slug`);
			}
			await client.execute("INSERT INTO _migrations VALUES ('remove_unique_slug_v2')");
		}
	} catch (e) {
		console.log('Slug migration:', e);
	}
}
