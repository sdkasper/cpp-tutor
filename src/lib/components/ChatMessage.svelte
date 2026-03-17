<script lang="ts">
	import { renderMarkdown } from '$lib/utils/markdown';

	let { role, content }: { role: string; content: string } = $props();

	let displayContent = $derived(content.replace('[PROBLEM_SOLVED]', '').trim());
	let htmlContent = $derived(renderMarkdown(displayContent));
</script>

<div class="flex gap-3 {role === 'user' ? 'flex-row-reverse' : ''} chat-message-enter">
	<div class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center {role === 'user' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'}">
		{#if role === 'user'}
			<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
			</svg>
		{:else}
			<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
				<path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z"/>
			</svg>
		{/if}
	</div>
	<div class="prose-rendered max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed {role === 'user' ? 'bg-indigo-600/20 text-indigo-100 border border-indigo-500/20' : 'bg-[var(--color-surface-light)] text-slate-300 border border-[var(--border-color)]'}">
		{@html htmlContent}
	</div>
</div>
