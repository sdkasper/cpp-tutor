import type { Student } from '$lib/types.js';

let currentStudent = $state<Student | null>(null);

export function getSession() {
	return {
		get student() {
			return currentStudent;
		},
		set student(s: Student | null) {
			currentStudent = s;
		}
	};
}
