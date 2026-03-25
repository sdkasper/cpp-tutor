import { basename } from 'path';
import matter from 'gray-matter';
import { nanoid } from 'nanoid';
import { db } from './db.js';
import { problems } from './schema.js';
import { eq, and } from 'drizzle-orm';

const markdownModules = import.meta.glob('/content/problems/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

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
	concepts: string[];
	lang: string;
}

function inferLang(filename: string, frontmatter: Record<string, unknown>): 'en' | 'ro' {
	if (frontmatter.lang === 'ro' || frontmatter.lang === 'en') return frontmatter.lang;
	if (filename.endsWith('.ro.md')) return 'ro';
	if (filename.endsWith('.en.md')) return 'en';
	return 'en';
}

function stripLangExtension(filename: string): string {
	return filename.replace(/\.(ro|en)\.md$/, '.md');
}

function slugFromFile(file: string): string {
	return basename(stripLangExtension(file), '.md');
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
		parsed = { data: {}, content: rawContent };
	} else {
		const result = matter(rawContent);
		parsed = { data: result.data as Record<string, unknown>, content: result.content };
	}

	const fm = parsed.data;

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
	if (!Array.isArray(fm.concepts)) {
		fm.concepts = [];
	}

	const body = parsed.content.trim();
	const normalized = matter.stringify(body ? body + '\n' : '', fm);
	return normalized;
}

export async function syncMarkdownFiles() {
	const entries = Object.entries(markdownModules);
	if (entries.length === 0) return;

	for (const [path, raw] of entries) {
		const file = basename(path);
		const slug = slugFromFile(file);
		const normalized = normalizeMarkdown(file, raw);

		const { data, content } = matter(normalized);
		const fm = data as ProblemFrontmatter;
		const lang = inferLang(file, data);

		const existing = await db.select().from(problems)
			.where(and(eq(problems.slug, slug), eq(problems.lang, lang)))
			.get();

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
			sort_order: fm.sort_order,
			concepts: JSON.stringify(fm.concepts),
			lang
		};

		if (existing) {
			await db.update(problems).set(problemData).where(eq(problems.id, existing.id)).run();
		} else {
			await db.insert(problems)
				.values({ id: nanoid(), ...problemData })
				.run();
		}
	}
}

export async function importMarkdownFile(filename: string, content: string) {
	const slug = basename(filename, '.md');
	const normalized = normalizeMarkdown(filename, content);

	const { data, content: body } = matter(normalized);
	const fm = data as ProblemFrontmatter;

	const existing = await db.select().from(problems).where(eq(problems.slug, slug)).get();

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
		await db.update(problems).set(problemData).where(eq(problems.id, existing.id)).run();
		id = existing.id;
	} else {
		id = nanoid();
		await db.insert(problems).values({ id, ...problemData }).run();
	}

	return { id, title: fm.title };
}

export async function insertProblemFromText(
	title: string,
	description: string,
	difficulty: string,
	sourceType: 'pdf' | 'url',
	sourceRef: string
) {
	const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
	const id = nanoid();

	await db.insert(problems)
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
