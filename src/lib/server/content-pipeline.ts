import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, basename } from 'path';
import matter from 'gray-matter';
import { nanoid } from 'nanoid';
import { db } from './db.js';
import { problems } from './schema.js';
import { eq } from 'drizzle-orm';

const CONTENT_DIR = resolve('content/problems');

const DEFAULT_STARTER_CODE = `#include <iostream>
using namespace std;

int main() {
    // Your code here

    return 0;
}`;

interface ProblemFrontmatter {
	title: string;
	difficulty: 'beginner' | 'easy' | 'medium' | 'hard';
	hints: string[];
	starter_code: string;
	solution_notes: string;
	sort_order: number;
}

function titleFromFilename(filename: string): string {
	const name = basename(filename, '.md');
	return name
		.replace(/^\d+[-_]*/, '') // strip leading numbers + separators
		.replace(/[-_]+/g, ' ')   // replace hyphens/underscores with spaces
		.replace(/\b\w/g, (c) => c.toUpperCase()) // title-case
		.trim() || name; // fallback to raw name if empty after stripping
}

function normalizeDifficulty(value: unknown): 'beginner' | 'easy' | 'medium' | 'hard' {
	if (typeof value !== 'string') return 'beginner';
	const lower = value.toLowerCase().trim();
	const map: Record<string, 'beginner' | 'easy' | 'medium' | 'hard'> = {
		beginner: 'beginner', intro: 'beginner', introduction: 'beginner',
		easy: 'easy', simple: 'easy',
		medium: 'medium', intermediate: 'medium', moderate: 'medium',
		hard: 'hard', difficult: 'hard', advanced: 'hard'
	};
	return map[lower] ?? 'beginner';
}

function normalizeHints(value: unknown): string[] {
	if (Array.isArray(value)) return value.map(String);
	if (typeof value === 'string' && value.trim()) return [value.trim()];
	return [];
}

export function normalizeMarkdown(filename: string, rawContent: string): string {
	let parsed: { data: Record<string, unknown>; content: string };

	if (!rawContent.trimStart().startsWith('---')) {
		// No frontmatter — treat entire content as body
		parsed = { data: {}, content: rawContent };
	} else {
		const result = matter(rawContent);
		parsed = { data: result.data as Record<string, unknown>, content: result.content };
	}

	const fm = parsed.data;

	// Ensure required fields
	if (!fm.title || (typeof fm.title === 'string' && !fm.title.trim())) {
		fm.title = titleFromFilename(filename);
	}
	fm.difficulty = normalizeDifficulty(fm.difficulty);
	fm.hints = normalizeHints(fm.hints);
	if (!fm.starter_code || (typeof fm.starter_code === 'string' && !fm.starter_code.trim())) {
		fm.starter_code = DEFAULT_STARTER_CODE;
	}
	if (fm.solution_notes === undefined || fm.solution_notes === null) {
		fm.solution_notes = '';
	}
	if (fm.sort_order === undefined || fm.sort_order === null) {
		fm.sort_order = 0;
	}

	const body = parsed.content.trim();

	// Reconstruct markdown with frontmatter
	const normalized = matter.stringify(body ? body + '\n' : '', fm);
	return normalized;
}

export function syncMarkdownFiles() {
	if (!existsSync(CONTENT_DIR)) return;

	const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));

	for (const file of files) {
		const slug = basename(file, '.md');
		const filePath = resolve(CONTENT_DIR, file);
		const raw = readFileSync(filePath, 'utf-8');
		const normalized = normalizeMarkdown(file, raw);

		// Write back only if changed
		if (normalized !== raw) {
			writeFileSync(filePath, normalized, 'utf-8');
		}

		const { data, content } = matter(normalized);
		const fm = data as ProblemFrontmatter;

		const existing = db.select().from(problems).where(eq(problems.slug, slug)).get();

		const problemData = {
			slug,
			title: fm.title,
			difficulty: fm.difficulty,
			description: content.trim(),
			hints: JSON.stringify(fm.hints),
			solution_notes: fm.solution_notes,
			starter_code: fm.starter_code,
			source_type: 'markdown' as const,
			source_ref: file,
			sort_order: fm.sort_order
		};

		if (existing) {
			db.update(problems).set(problemData).where(eq(problems.id, existing.id)).run();
		} else {
			db.insert(problems)
				.values({ id: nanoid(), ...problemData })
				.run();
		}
	}
}

export function importMarkdownFile(filename: string, content: string) {
	const slug = basename(filename, '.md');
	const normalized = normalizeMarkdown(filename, content);

	// Write the normalized file to content/problems/
	const destPath = resolve(CONTENT_DIR, filename);
	writeFileSync(destPath, normalized, 'utf-8');

	// Parse the normalized content
	const { data, content: body } = matter(normalized);
	const fm = data as ProblemFrontmatter;

	// Upsert into DB
	const existing = db.select().from(problems).where(eq(problems.slug, slug)).get();

	const problemData = {
		slug,
		title: fm.title,
		difficulty: fm.difficulty,
		description: body.trim(),
		hints: JSON.stringify(fm.hints),
		solution_notes: fm.solution_notes,
		starter_code: fm.starter_code,
		source_type: 'markdown' as const,
		source_ref: filename,
		sort_order: fm.sort_order
	};

	let id: string;
	if (existing) {
		db.update(problems).set(problemData).where(eq(problems.id, existing.id)).run();
		id = existing.id;
	} else {
		id = nanoid();
		db.insert(problems).values({ id, ...problemData }).run();
	}

	return { id, title: fm.title };
}

export function insertProblemFromText(
	title: string,
	description: string,
	difficulty: string,
	sourceType: 'pdf' | 'url',
	sourceRef: string
) {
	const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
	const id = nanoid();

	db.insert(problems)
		.values({
			id,
			slug,
			title,
			difficulty,
			description,
			hints: '[]',
			solution_notes: '',
			starter_code: '',
			source_type: sourceType,
			source_ref: sourceRef,
			sort_order: 999
		})
		.run();

	return id;
}
