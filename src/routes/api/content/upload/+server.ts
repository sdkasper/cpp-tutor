import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { extractTextFromPdf } from '$lib/server/pdf-parser.js';
import { insertProblemFromText, importMarkdownFile } from '$lib/server/content-pipeline.js';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('file') as File | null;

	if (!file) {
		return json({ error: 'File is required' }, { status: 400 });
	}

	const filename = file.name.toLowerCase();

	if (filename.endsWith('.md')) {
		const text = await file.text();
		const result = await importMarkdownFile(file.name, text);
		return json(result);
	}

	// PDF upload — requires title
	const title = formData.get('title') as string;
	const difficulty = formData.get('difficulty') as string;

	if (!title) {
		return json({ error: 'Title is required for PDF uploads' }, { status: 400 });
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const pdfText = await extractTextFromPdf(buffer);

	const id = await insertProblemFromText(title, pdfText, difficulty || 'beginner', 'pdf', file.name);

	return json({ id });
};
