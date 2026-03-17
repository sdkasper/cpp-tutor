import type { RequestHandler } from './$types';
import { executeCode, transformFileIO } from '$lib/server/piston.js';

// In-memory rate limiting: studentId -> { count, resetAt }
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const MAX_EXECUTIONS = 10;
const WINDOW_MS = 60_000;
const MAX_CODE_SIZE = 50 * 1024; // 50KB

function checkRateLimit(studentId: string): boolean {
	const now = Date.now();
	const entry = rateLimits.get(studentId);

	if (!entry || now > entry.resetAt) {
		rateLimits.set(studentId, { count: 1, resetAt: now + WINDOW_MS });
		return true;
	}

	if (entry.count >= MAX_EXECUTIONS) {
		return false;
	}

	entry.count++;
	return true;
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	const studentId = cookies.get('student_id');
	if (!studentId) {
		return new Response(JSON.stringify({ error: 'Not logged in' }), { status: 401 });
	}

	if (!checkRateLimit(studentId)) {
		return new Response(
			JSON.stringify({ error: 'Rate limit exceeded. Please wait a minute before running again.' }),
			{ status: 429 }
		);
	}

	const body = await request.json();
	const { code, stdin } = body;

	if (!code || typeof code !== 'string') {
		return new Response(JSON.stringify({ error: 'No code provided' }), { status: 400 });
	}

	if (code.length > MAX_CODE_SIZE) {
		return new Response(
			JSON.stringify({ error: `Code too large (${Math.round(code.length / 1024)}KB). Maximum is 50KB.` }),
			{ status: 400 }
		);
	}

	// Transform file I/O to stdin/stdout for Romanian problems
	const { code: transformedCode } = transformFileIO(code);

	const result = await executeCode(transformedCode, stdin || '');

	return new Response(JSON.stringify(result), {
		headers: { 'Content-Type': 'application/json' }
	});
};
