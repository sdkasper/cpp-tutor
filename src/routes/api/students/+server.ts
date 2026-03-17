import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db.js';
import { students } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { name } = await request.json();
	if (!name?.trim()) {
		return json({ error: 'Name is required' }, { status: 400 });
	}

	const existing = await db.select().from(students).where(eq(students.name, name.trim())).get();
	if (existing) {
		return json({ error: 'That name is already taken. Pick it from the list below, or choose a different name.' }, { status: 409 });
	}

	const now = new Date().toISOString();
	const id = nanoid();

	await db.insert(students).values({ id, name: name.trim(), created_at: now, last_active: now }).run();

	cookies.set('student_id', id, { path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 });

	return json({ id, name: name.trim() });
};

export const PUT: RequestHandler = async ({ request, cookies }) => {
	const { id } = await request.json();

	const student = await db.select().from(students).where(eq(students.id, id)).get();
	if (!student) {
		return json({ error: 'Student not found' }, { status: 404 });
	}

	await db.update(students).set({ last_active: new Date().toISOString() }).where(eq(students.id, id)).run();
	cookies.set('student_id', id, { path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 });

	return json({ ok: true });
};
