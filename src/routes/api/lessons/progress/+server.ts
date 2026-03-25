import type { RequestHandler } from './$types';
import { db } from '$lib/server/db.js';
import { lessonProgress } from '$lib/server/schema.js';
import { and, eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const studentId = cookies.get('student_id');
	if (!studentId) {
		return new Response(JSON.stringify({ error: 'Not logged in' }), { status: 401 });
	}

	const { lessonId, status } = await request.json();

	if (!lessonId || !status) {
		return new Response(JSON.stringify({ error: 'Missing lessonId or status' }), { status: 400 });
	}

	const existing = await db.select().from(lessonProgress)
		.where(and(
			eq(lessonProgress.student_id, studentId),
			eq(lessonProgress.lesson_id, lessonId)
		))
		.get();

	const now = new Date().toISOString();

	if (existing) {
		await db.update(lessonProgress)
			.set({
				status,
				...(status === 'completed' ? { completed_at: now } : {})
			})
			.where(and(
				eq(lessonProgress.student_id, studentId),
				eq(lessonProgress.lesson_id, lessonId)
			))
			.run();
	} else {
		await db.insert(lessonProgress)
			.values({
				student_id: studentId,
				lesson_id: lessonId,
				status,
				started_at: now,
				...(status === 'completed' ? { completed_at: now } : {})
			})
			.run();
	}

	return new Response(JSON.stringify({ ok: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
