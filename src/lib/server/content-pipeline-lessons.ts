import { basename } from 'path';
import matter from 'gray-matter';
import { nanoid } from 'nanoid';
import { db } from './db.js';
import { lessons } from './schema.js';
import { eq, and } from 'drizzle-orm';

const lessonModules = import.meta.glob('/content/lessons/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

interface LessonFrontmatter {
	title: string;
	slug: string;
	sort_order: number;
	concepts: string[];
	summary: string;
	estimated_minutes: number;
	prev_lesson: string | null;
	next_lesson: string | null;
	lang: string;
}

function titleFromFilename(filename: string): string {
	const name = basename(filename, '.md').replace(/\.(ro|en)$/, '');
	return name
		.replace(/^\d+[-_]*/, '')
		.replace(/[-_]+/g, ' ')
		.replace(/\b\w/g, (c) => c.toUpperCase())
		.trim() || name;
}

function inferLang(filename: string, frontmatter: Record<string, unknown>): 'en' | 'ro' {
	if (frontmatter.lang === 'ro' || frontmatter.lang === 'en') return frontmatter.lang;
	if (filename.endsWith('.ro.md')) return 'ro';
	if (filename.endsWith('.en.md')) return 'en';
	return 'en';
}

function slugFromFile(file: string, fmSlug?: string): string {
	if (fmSlug) return fmSlug;
	const stripped = file.replace(/\.(ro|en)\.md$/, '.md');
	return basename(stripped, '.md');
}

export async function syncLessonFiles() {
	const entries = Object.entries(lessonModules);
	if (entries.length === 0) return;

	for (const [path, raw] of entries) {
		const file = basename(path);

		const { data, content } = matter(raw);
		const fm = data as Partial<LessonFrontmatter>;
		const lang = inferLang(file, data);

		const slug = slugFromFile(file, fm.slug);
		const title = fm.title || titleFromFilename(file);
		const sort_order = fm.sort_order ?? 0;
		const concepts = Array.isArray(fm.concepts) ? fm.concepts : [];
		const summary = fm.summary || '';
		const estimated_minutes = fm.estimated_minutes ?? 10;
		const prev_lesson = fm.prev_lesson ?? null;
		const next_lesson = fm.next_lesson ?? null;

		const lessonData = {
			slug,
			title,
			sort_order,
			concepts: JSON.stringify(concepts),
			summary,
			estimated_minutes,
			content: content.trim(),
			prev_lesson,
			next_lesson,
			source_ref: file,
			lang
		};

		const existing = await db.select().from(lessons)
			.where(and(eq(lessons.slug, slug), eq(lessons.lang, lang)))
			.get();

		if (existing) {
			await db.update(lessons).set(lessonData).where(eq(lessons.id, existing.id)).run();
		} else {
			await db.insert(lessons)
				.values({ id: nanoid(), ...lessonData })
				.run();
		}
	}
}
