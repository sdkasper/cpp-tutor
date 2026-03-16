<script lang="ts">
	import { Marked } from 'marked';
	import hljs from 'highlight.js/lib/core';
	import cpp from 'highlight.js/lib/languages/cpp';
	import { markedHighlight } from 'marked-highlight';

	hljs.registerLanguage('cpp', cpp);
	hljs.registerLanguage('c', cpp);

	const marked = new Marked(
		markedHighlight({
			highlight(code, lang) {
				if (lang && hljs.getLanguage(lang)) {
					return hljs.highlight(code, { language: lang }).value;
				}
				// Default to C++ since this is a C++ tutor
				return hljs.highlight(code, { language: 'cpp' }).value;
			}
		})
	);

	marked.setOptions({ breaks: true, gfm: true });

	let { role, content }: { role: string; content: string } = $props();

	let displayContent = $derived(content.replace('[PROBLEM_SOLVED]', '').trim());
	let htmlContent = $derived(marked.parse(displayContent) as string);
</script>

<div class="flex gap-3 {role === 'user' ? 'flex-row-reverse' : ''}">
	<div class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold {role === 'user' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'}">
		{role === 'user' ? 'U' : 'T'}
	</div>
	<div class="chat-message max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed {role === 'user' ? 'bg-indigo-600/20 text-indigo-100 border border-indigo-500/20' : 'bg-[#2a2a3e] text-slate-300 border border-white/10'}">
		{@html htmlContent}
	</div>
</div>

<style>
	.chat-message :global(pre) {
		background: #1e1e2e;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 12px;
		overflow-x: auto;
		margin: 8px 0;
	}

	.chat-message :global(code) {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.85em;
	}

	.chat-message :global(:not(pre) > code) {
		background: rgba(255, 255, 255, 0.1);
		padding: 2px 6px;
		border-radius: 4px;
	}

	.chat-message :global(p) {
		margin: 4px 0;
	}

	.chat-message :global(ul),
	.chat-message :global(ol) {
		padding-left: 1.5em;
		margin: 4px 0;
	}

	/* highlight.js One Dark-inspired theme for code blocks */
	.chat-message :global(.hljs) {
		color: #abb2bf;
	}
	.chat-message :global(.hljs-keyword) {
		color: #c678dd;
	}
	.chat-message :global(.hljs-built_in),
	.chat-message :global(.hljs-type) {
		color: #e5c07b;
	}
	.chat-message :global(.hljs-string) {
		color: #98c379;
	}
	.chat-message :global(.hljs-number) {
		color: #d19a66;
	}
	.chat-message :global(.hljs-comment) {
		color: #5c6370;
		font-style: italic;
	}
	.chat-message :global(.hljs-function) {
		color: #61afef;
	}
	.chat-message :global(.hljs-title) {
		color: #61afef;
	}
	.chat-message :global(.hljs-params) {
		color: #abb2bf;
	}
	.chat-message :global(.hljs-meta) {
		color: #56b6c2;
	}
	.chat-message :global(.hljs-literal) {
		color: #d19a66;
	}
	.chat-message :global(.hljs-symbol) {
		color: #61afef;
	}
</style>
