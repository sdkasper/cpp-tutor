import { initDb } from '$lib/server/db.js';
import { syncMarkdownFiles } from '$lib/server/content-pipeline.js';

try {
	await initDb();
	await syncMarkdownFiles();
} catch (e) {
	console.error('Startup init failed:', e);
}
