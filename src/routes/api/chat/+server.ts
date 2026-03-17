import type { RequestHandler } from './$types';
import { db } from '$lib/server/db.js';
import { conversations, messages, studentProgress, problems } from '$lib/server/schema.js';
import { eq, and } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { streamTutorResponse, detectProblemSolved } from '$lib/server/tutor.js';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const studentId = cookies.get('student_id');
	if (!studentId) {
		return new Response(JSON.stringify({ error: 'Not logged in' }), { status: 401 });
	}

	const { problemId, message, currentCode } = await request.json();
	if (!problemId || !message) {
		return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
	}

	const problem = await db.select().from(problems).where(eq(problems.id, problemId)).get();
	if (!problem) {
		return new Response(JSON.stringify({ error: 'Problem not found' }), { status: 404 });
	}

	// Get or create conversation
	let conversation = await db
		.select()
		.from(conversations)
		.where(and(eq(conversations.student_id, studentId), eq(conversations.problem_id, problemId)))
		.get();

	if (!conversation) {
		const convId = nanoid();
		await db.insert(conversations)
			.values({ id: convId, student_id: studentId, problem_id: problemId, created_at: new Date().toISOString() })
			.run();
		conversation = { id: convId, student_id: studentId, problem_id: problemId, created_at: new Date().toISOString() };
	}

	// Save user message
	await db.insert(messages)
		.values({ id: nanoid(), conversation_id: conversation.id, role: 'user', content: message, created_at: new Date().toISOString() })
		.run();

	// Update progress
	const progress = await db
		.select()
		.from(studentProgress)
		.where(and(eq(studentProgress.student_id, studentId), eq(studentProgress.problem_id, problemId)))
		.get();

	if (!progress) {
		await db.insert(studentProgress)
			.values({ student_id: studentId, problem_id: problemId, status: 'in_progress', current_code: currentCode ?? '', hints_used: 0, started_at: new Date().toISOString() })
			.run();
	} else {
		await db.update(studentProgress)
			.set({ current_code: currentCode ?? progress.current_code, status: 'in_progress' })
			.where(and(eq(studentProgress.student_id, studentId), eq(studentProgress.problem_id, problemId)))
			.run();
	}

	const hintsUsed = progress?.hints_used ?? 0;

	// Get conversation history
	const historyRows = await db
		.select()
		.from(messages)
		.where(eq(messages.conversation_id, conversation.id))
		.all();

	const history = historyRows
		.slice(-20) // Keep last 20 messages for context
		.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));

	// Remove the user message we just added (it's in userMessage param)
	history.pop();

	const stream = new ReadableStream({
		async start(controller) {
			let fullResponse = '';
			try {
				for await (const chunk of streamTutorResponse({
					problemTitle: problem.title,
					problemDescription: problem.description,
					difficulty: problem.difficulty,
					starterCode: problem.starter_code,
					currentCode: currentCode ?? '',
					hintsUsed,
					conversationHistory: history,
					userMessage: message
				})) {
					fullResponse += chunk;
					controller.enqueue(new TextEncoder().encode(chunk));
				}

				// Save assistant message
				await db.insert(messages)
					.values({ id: nanoid(), conversation_id: conversation!.id, role: 'assistant', content: fullResponse, created_at: new Date().toISOString() })
					.run();

				// Update hints used
				await db.update(studentProgress)
					.set({ hints_used: hintsUsed + 1 })
					.where(and(eq(studentProgress.student_id, studentId), eq(studentProgress.problem_id, problemId)))
					.run();

				// Check for problem solved
				if (detectProblemSolved(fullResponse)) {
					await db.update(studentProgress)
						.set({ status: 'completed', completed_at: new Date().toISOString() })
						.where(and(eq(studentProgress.student_id, studentId), eq(studentProgress.problem_id, problemId)))
						.run();
				}
			} catch (err) {
				controller.enqueue(new TextEncoder().encode('\n\n[Error: Something went wrong with the AI tutor. Please try again.]'));
			}
			controller.close();
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'no-cache',
			'Transfer-Encoding': 'chunked'
		}
	});
};
