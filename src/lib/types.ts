export interface Student {
	id: string;
	name: string;
	created_at: string;
	last_active: string;
}

export interface Problem {
	id: string;
	slug: string;
	title: string;
	difficulty: 'beginner' | 'easy' | 'medium' | 'hard';
	description: string;
	hints: string[];
	solution_notes: string;
	starter_code: string;
	source_type: 'markdown' | 'pdf' | 'url';
	source_ref: string;
	sort_order: number;
	concepts: string[];
	lang: 'en' | 'ro';
}

export interface StudentProgress {
	student_id: string;
	problem_id: string;
	status: 'not_started' | 'in_progress' | 'completed';
	current_code: string;
	hints_used: number;
	started_at: string | null;
	completed_at: string | null;
}

export interface Conversation {
	id: string;
	student_id: string;
	problem_id: string;
	created_at: string;
}

export interface Message {
	id: string;
	conversation_id: string;
	role: 'user' | 'assistant';
	content: string;
	created_at: string;
}

export interface Lesson {
	id: string;
	slug: string;
	title: string;
	sort_order: number;
	concepts: string[];
	summary: string;
	estimated_minutes: number;
	content: string;
	prev_lesson: string | null;
	next_lesson: string | null;
	lang: 'en' | 'ro';
}

export interface LessonProgress {
	student_id: string;
	lesson_id: string;
	status: 'not_started' | 'in_progress' | 'completed';
	started_at: string | null;
	completed_at: string | null;
}
