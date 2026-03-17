import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db.js';
import { students } from '$lib/server/schema.js';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const studentId = cookies.get('student_id');
	if (!studentId) return { student: null };

	const student = await db.select().from(students).where(eq(students.id, studentId)).get();
	return { student: student ?? null };
};
