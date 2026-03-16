import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db.js';
import { problems, studentProgress } from '$lib/server/schema.js';
import { eq, asc } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const studentId = cookies.get('student_id');
	if (!studentId) throw redirect(303, '/');

	const allProblems = db.select().from(problems).orderBy(asc(problems.sort_order)).all();
	const progress = db.select().from(studentProgress).where(eq(studentProgress.student_id, studentId)).all();
	const progressMap = new Map(progress.map((p) => [p.problem_id, p]));

	const total = allProblems.length;
	const completed = progress.filter((p) => p.status === 'completed').length;
	const inProgress = progress.filter((p) => p.status === 'in_progress').length;

	return {
		stats: { total, completed, inProgress },
		problems: allProblems.map((p) => ({
			id: p.id,
			title: p.title,
			difficulty: p.difficulty,
			progress: progressMap.get(p.id) ?? null
		}))
	};
};
