<script lang="ts">
	import { renderMarkdown } from '$lib/utils/markdown';
	import RunnableCode from './RunnableCode.svelte';
	import ExerciseBlock from './ExerciseBlock.svelte';

	interface Props {
		content: string;
	}

	let { content }: Props = $props();

	interface Segment {
		type: 'html' | 'runnable' | 'exercise';
		content: string;
		code?: string;
		hint?: string;
	}

	let segments = $derived(parseContent(content));

	function parseContent(raw: string): Segment[] {
		const result: Segment[] = [];
		const lines = raw.split('\n');
		let i = 0;
		let buffer: string[] = [];

		function flushBuffer() {
			if (buffer.length > 0) {
				const text = buffer.join('\n').trim();
				if (text) {
					result.push({ type: 'html', content: renderMarkdown(text) });
				}
				buffer = [];
			}
		}

		while (i < lines.length) {
			const line = lines[i];

			// Check for <!-- run --> marker
			if (line.trim() === '<!-- run -->') {
				flushBuffer();
				i++;
				// Expect a fenced code block next
				const code = extractCodeBlock(lines, i);
				if (code) {
					result.push({ type: 'runnable', content: '', code: code.code });
					i = code.endIndex + 1;
				}
				continue;
			}

			// Check for <!-- exercise --> marker
			if (line.trim() === '<!-- exercise -->') {
				flushBuffer();
				i++;
				const exercise = extractExercise(lines, i);
				if (exercise) {
					result.push({
						type: 'exercise',
						content: renderMarkdown(exercise.description),
						code: exercise.code,
						hint: exercise.hint
					});
					i = exercise.endIndex + 1;
				}
				continue;
			}

			buffer.push(line);
			i++;
		}

		flushBuffer();
		return result;
	}

	function extractCodeBlock(lines: string[], startIndex: number): { code: string; endIndex: number } | null {
		let i = startIndex;
		// Skip blank lines
		while (i < lines.length && lines[i].trim() === '') i++;

		if (i >= lines.length || !lines[i].trim().startsWith('```')) return null;

		i++; // skip opening ```
		const codeLines: string[] = [];
		while (i < lines.length && !lines[i].trim().startsWith('```')) {
			codeLines.push(lines[i]);
			i++;
		}
		return { code: codeLines.join('\n'), endIndex: i };
	}

	function extractExercise(lines: string[], startIndex: number): { description: string; code: string; hint?: string; endIndex: number } | null {
		let i = startIndex;
		const descLines: string[] = [];
		let code = '';
		let hint: string | undefined;

		while (i < lines.length) {
			const line = lines[i];

			if (line.trim() === '<!-- /exercise -->') {
				return { description: descLines.join('\n'), code, hint, endIndex: i };
			}

			// Check for hint comment
			const hintMatch = line.match(/^<!-- hint: (.+) -->$/);
			if (hintMatch) {
				hint = hintMatch[1];
				i++;
				continue;
			}

			// Check for code block inside exercise
			if (line.trim().startsWith('```')) {
				i++; // skip opening ```
				const codeLines: string[] = [];
				while (i < lines.length && !lines[i].trim().startsWith('```')) {
					codeLines.push(lines[i]);
					i++;
				}
				code = codeLines.join('\n');
				i++; // skip closing ```
				continue;
			}

			descLines.push(line);
			i++;
		}

		// No closing tag found, return what we have
		return { description: descLines.join('\n'), code, hint, endIndex: i };
	}
</script>

<div class="lesson-content prose">
	{#each segments as segment}
		{#if segment.type === 'html'}
			{@html segment.content}
		{:else if segment.type === 'runnable' && segment.code}
			<RunnableCode initialCode={segment.code} readOnly={true} />
		{:else if segment.type === 'exercise' && segment.code}
			<ExerciseBlock
				description={segment.content}
				starterCode={segment.code}
				hint={segment.hint}
			/>
		{/if}
	{/each}
</div>

<style>
	.lesson-content :global(h1) {
		font-size: 1.75rem;
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: var(--color-text);
	}

	.lesson-content :global(h2) {
		font-size: 1.375rem;
		font-weight: 600;
		margin-top: 1.75rem;
		margin-bottom: 0.75rem;
		color: var(--color-text);
	}

	.lesson-content :global(h3) {
		font-size: 1.125rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
		color: var(--color-text);
	}

	.lesson-content :global(p) {
		margin-bottom: 1rem;
		line-height: 1.7;
		color: var(--color-text);
	}

	.lesson-content :global(code) {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875em;
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		background: var(--color-surface-raised);
		color: var(--color-primary);
	}

	.lesson-content :global(pre) {
		margin: 1rem 0;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		background: var(--color-surface-raised);
		border: 1px solid var(--border-color);
	}

	.lesson-content :global(pre code) {
		padding: 0;
		background: none;
		color: var(--color-text);
	}

	.lesson-content :global(ul), .lesson-content :global(ol) {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
		color: var(--color-text);
	}

	.lesson-content :global(li) {
		margin-bottom: 0.25rem;
		line-height: 1.7;
	}

	.lesson-content :global(strong) {
		color: var(--color-text);
		font-weight: 600;
	}

	.lesson-content :global(blockquote) {
		border-left: 3px solid var(--color-primary);
		padding-left: 1rem;
		margin: 1rem 0;
		color: var(--color-text-muted);
	}
</style>
