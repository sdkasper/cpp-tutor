import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db.js';
import { lessons, lessonProgress } from '$lib/server/schema.js';
import { eq, and, asc } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const studentId = cookies.get('student_id');
	if (!studentId) throw redirect(303, '/');

	const locale = (cookies.get('locale') as 'en' | 'ro') || 'en';

	const allLessons = await db.select().from(lessons)
		.where(eq(lessons.lang, locale))
		.orderBy(asc(lessons.sort_order))
		.all();

	// Fall back to English if no lessons exist for this locale
	const finalLessons = allLessons.length > 0
		? allLessons
		: await db.select().from(lessons).where(eq(lessons.lang, 'en')).orderBy(asc(lessons.sort_order)).all();

	const progress = await db.select().from(lessonProgress).where(eq(lessonProgress.student_id, studentId)).all();
	const progressMap = new Map(progress.map((p) => [p.lesson_id, p]));

	return {
		lessons: finalLessons.map((l) => ({
			id: l.id,
			slug: l.slug,
			title: l.title,
			sort_order: l.sort_order,
			concepts: JSON.parse(l.concepts) as string[],
			summary: l.summary,
			estimated_minutes: l.estimated_minutes,
			progress: progressMap.get(l.id) ?? null
		}))
	};
};
