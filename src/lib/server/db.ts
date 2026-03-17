import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema.js';

const client = createClient({
	url: process.env.TURSO_DATABASE_URL ?? 'file:data/cpp-tutor.db',
	authToken: process.env.TURSO_AUTH_TOKEN
});

export const db = drizzle(client, { schema });

export async function initDb() {
	await client.executeMultiple(`
		CREATE TABLE IF NOT EXISTS students (
			id TEXT PRIMARY KEY,
			name TEXT NOT NULL UNIQUE,
			created_at TEXT NOT NULL,
			last_active TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS problems (
			id TEXT PRIMARY KEY,
			slug TEXT NOT NULL UNIQUE,
			title TEXT NOT NULL,
			difficulty TEXT NOT NULL DEFAULT 'beginner',
			description TEXT NOT NULL,
			hints TEXT NOT NULL DEFAULT '[]',
			solution_notes TEXT NOT NULL DEFAULT '',
			starter_code TEXT NOT NULL DEFAULT '',
			source_type TEXT NOT NULL DEFAULT 'markdown',
			source_ref TEXT NOT NULL DEFAULT '',
			sort_order INTEGER NOT NULL DEFAULT 0
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
	`);
}
