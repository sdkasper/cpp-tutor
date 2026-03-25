import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db.js';
import { problems, studentProgress } from '$lib/server/schema.js';
import { eq, asc } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const studentId = cookies.get('student_id');
	if (!studentId) throw redirect(303, '/');

	const locale = (cookies.get('locale') as 'en' | 'ro') || 'en';

	let allProblems = await db.select().from(problems)
		.where(eq(problems.lang, locale))
		.orderBy(asc(problems.sort_order))
		.all();

	// Fall back to English if no problems for this locale
	if (allProblems.length === 0) {
		allProblems = await db.select().from(problems)
			.where(eq(problems.lang, 'en'))
			.orderBy(asc(problems.sort_order))
			.all();
	}

	const progress = await db.select().from(studentProgress).where(eq(studentProgress.student_id, studentId)).all();
	const progressMap = new Map(progress.map((p) => [p.problem_id, p]));

	return {
		problems: allProblems.map((p) => ({
			...p,
			hints: JSON.parse(p.hints) as string[],
			progress: progressMap.get(p.id) ?? null
		}))
	};
};
