import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { syncMarkdownFiles } from '$lib/server/content-pipeline.js';

export const POST: RequestHandler = async () => {
	syncMarkdownFiles();
	return json({ ok: true });
};
