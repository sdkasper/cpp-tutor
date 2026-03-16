import { initDb } from '$lib/server/db.js';
import { syncMarkdownFiles } from '$lib/server/content-pipeline.js';

initDb();
syncMarkdownFiles();
