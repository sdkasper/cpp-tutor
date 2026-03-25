import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db.js';
import { lessons, lessonProgress, problems } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const studentId = cookies.get('student_id');
	if (!studentId) throw redirect(303, '/');

	const lesson = await db.select().from(lessons).where(eq(lessons.slug, params.lessonSlug)).get();
	if (!lesson) throw error(404, 'Lesson not found');

	const lessonConcepts = JSON.parse(lesson.concepts) as string[];

	// Find matching problems by concept intersection
	const allProblems = await db.select().from(problems).all();
	const matchingProblems = allProblems
		.filter((p) => {
			const problemConcepts = JSON.parse(p.concepts) as string[];
			return problemConcepts.some((c) => lessonConcepts.includes(c));
		})
		.map((p) => ({
			id: p.id,
			title: p.title,
			difficulty: p.difficulty,
			slug: p.slug
		}));

	// Get lesson progress
	const progress = await db.select().from(lessonProgress)
		.where(eq(lessonProgress.student_id, studentId))
		.all();
	const progressEntry = progress.find((p) => p.lesson_id === lesson.id);

	// Mark as in_progress if not started
	if (!progressEntry) {
		await db.insert(lessonProgress).values({
			student_id: studentId,
			lesson_id: lesson.id,
			status: 'in_progress',
			started_at: new Date().toISOString()
		}).run();
	}

	return {
		lesson: {
			...lesson,
			concepts: lessonConcepts
		},
		matchingProblems,
		progress: progressEntry ?? { status: 'in_progress' }
	};
};
