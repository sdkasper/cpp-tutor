import { initDb } from '$lib/server/db.js';
import { syncMarkdownFiles } from '$lib/server/content-pipeline.js';
import { syncLessonFiles } from '$lib/server/content-pipeline-lessons.js';

try {
	await initDb();
	await syncMarkdownFiles();
	await syncLessonFiles();
} catch (e) {
	console.error('Startup init failed:', e);
}
