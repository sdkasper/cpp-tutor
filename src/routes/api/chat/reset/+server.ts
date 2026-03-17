import type { RequestHandler } from './$types';
import { db } from '$lib/server/db.js';
import { conversations, messages } from '$lib/server/schema.js';
import { eq, and } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const studentId = cookies.get('student_id');
	if (!studentId) {
		return new Response(JSON.stringify({ error: 'Not logged in' }), { status: 401 });
	}

	const { problemId } = await request.json();
	if (!problemId) {
		return new Response(JSON.stringify({ error: 'Missing problemId' }), { status: 400 });
	}

	const conversation = await db
		.select()
		.from(conversations)
		.where(and(eq(conversations.student_id, studentId), eq(conversations.problem_id, problemId)))
		.get();

	if (conversation) {
		await db.delete(messages).where(eq(messages.conversation_id, conversation.id)).run();
		await db.delete(conversations).where(eq(conversations.id, conversation.id)).run();
	}

	return new Response(JSON.stringify({ ok: true }));
};
