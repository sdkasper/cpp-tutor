import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db.js';
import { students } from '$lib/server/schema.js';

export const load: PageServerLoad = async () => {
	const allStudents = await db.select().from(students).all();
	return { students: allStudents };
};
