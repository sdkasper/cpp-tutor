import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db.js';
import { problems, studentProgress, conversations, messages } from '$lib/server/schema.js';
import { eq, and } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const studentId = cookies.get('student_id');
	if (!studentId) throw redirect(303, '/');

	const problem = await db.select().from(problems).where(eq(problems.id, params.problemId)).get();
	if (!problem) throw redirect(303, '/problems');

	const progress = await db
		.select()
		.from(studentProgress)
		.where(and(eq(studentProgress.student_id, studentId), eq(studentProgress.problem_id, problem.id)))
		.get();

	const conversation = await db
		.select()
		.from(conversations)
		.where(and(eq(conversations.student_id, studentId), eq(conversations.problem_id, problem.id)))
		.get();

	let chatHistory: { role: string; content: string; created_at: string }[] = [];
	if (conversation) {
		chatHistory = await db.select().from(messages).where(eq(messages.conversation_id, conversation.id)).all();
	}

	return {
		problem: { ...problem, hints: JSON.parse(problem.hints) as string[] },
		progress,
		chatHistory,
		studentId
	};
};
