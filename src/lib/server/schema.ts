import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const students = sqliteTable('students', {
	id: text('id').primaryKey(),
	name: text('name').notNull().unique(),
	created_at: text('created_at').notNull(),
	last_active: text('last_active').notNull()
});

export const problems = sqliteTable('problems', {
	id: text('id').primaryKey(),
	slug: text('slug').notNull(),
	title: text('title').notNull(),
	difficulty: text('difficulty').notNull().default('beginner'),
	description: text('description').notNull(),
	hints: text('hints').notNull().default('[]'),
	solution_notes: text('solution_notes').notNull().default(''),
	starter_code: text('starter_code').notNull().default(''),
	source_type: text('source_type').notNull().default('markdown'),
	source_ref: text('source_ref').notNull().default(''),
	sort_order: integer('sort_order').notNull().default(0),
	concepts: text('concepts').notNull().default('[]'),
	lang: text('lang').notNull().default('en')
});

export const lessons = sqliteTable('lessons', {
	id: text('id').primaryKey(),
	slug: text('slug').notNull(),
	title: text('title').notNull(),
	sort_order: integer('sort_order').notNull().default(0),
	concepts: text('concepts').notNull().default('[]'),
	summary: text('summary').notNull().default(''),
	estimated_minutes: integer('estimated_minutes').notNull().default(10),
	content: text('content').notNull(),
	prev_lesson: text('prev_lesson'),
	next_lesson: text('next_lesson'),
	source_ref: text('source_ref').notNull().default(''),
	lang: text('lang').notNull().default('en')
});

export const lessonProgress = sqliteTable('lesson_progress', {
	student_id: text('student_id').notNull().references(() => students.id),
	lesson_id: text('lesson_id').notNull().references(() => lessons.id),
	status: text('status').notNull().default('not_started'),
	started_at: text('started_at'),
	completed_at: text('completed_at')
});

export const studentProgress = sqliteTable('student_progress', {
	student_id: text('student_id').notNull().references(() => students.id),
	problem_id: text('problem_id').notNull().references(() => problems.id),
	status: text('status').notNull().default('not_started'),
	current_code: text('current_code').notNull().default(''),
	hints_used: integer('hints_used').notNull().default(0),
	started_at: text('started_at'),
	completed_at: text('completed_at')
});

export const conversations = sqliteTable('conversations', {
	id: text('id').primaryKey(),
	student_id: text('student_id').notNull().references(() => students.id),
	problem_id: text('problem_id').notNull().references(() => problems.id),
	created_at: text('created_at').notNull()
});

export const messages = sqliteTable('messages', {
	id: text('id').primaryKey(),
	conversation_id: text('conversation_id').notNull().references(() => conversations.id),
	role: text('role').notNull(),
	content: text('content').notNull(),
	created_at: text('created_at').notNull()
});

export const urlCredentials = sqliteTable('url_credentials', {
	id: text('id').primaryKey(),
	domain: text('domain').notNull().unique(),
	auth_type: text('auth_type').notNull(),
	credentials: text('credentials').notNull().default('{}')
});
