<script lang="ts">
	import { tick, untrack } from 'svelte';
	import ChatMessage from './ChatMessage.svelte';
	import { t } from '$lib/i18n';

	interface ExecutionResult {
		stdout: string;
		stderr: string;
		compile_output: string;
		status: string;
		exit_code: number;
	}

	interface Props {
		problemId: string;
		currentCode: string;
		initialMessages: { role: string; content: string }[];
		onSolved: () => void;
		checkRequested?: boolean;
		executionResult?: ExecutionResult | null;
	}

	let { problemId, currentCode, initialMessages, onSolved, checkRequested = $bindable(false), executionResult = null }: Props = $props();

	let chatMessages = $state<{ role: string; content: string }[]>([...initialMessages]);
	let input = $state('');
	let streaming = $state(false);
	let chatContainer: HTMLDivElement;
	let resetting = $state(false);

	$effect(() => {
		if (checkRequested) {
			untrack(() => {
				sendCheckRequest();
				checkRequested = false;
			});
		}
	});

	async function resetConversation() {
		if (streaming) return;
		resetting = true;
		try {
			await fetch('/api/chat/reset', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ problemId })
			});
			chatMessages = [];
		} catch {
			// ignore
		}
		resetting = false;
	}

	async function sendCheckRequest() {
		if (streaming) return;
		const msg = `[CHECK] Please review my current code below. Check if it solves the problem correctly, point out any errors or issues, and tell me what to fix — but guide me with questions, don't give the full solution.

\`\`\`cpp
${currentCode}
\`\`\``;
		chatMessages = [...chatMessages, { role: 'user', content: 'Check my code' }]; // Keep English for API
		streaming = true;
		await scrollToBottom();
		chatMessages = [...chatMessages, { role: 'assistant', content: '' }];

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ problemId, message: msg, currentCode, executionResult })
			});

			if (!res.ok || !res.body) {
				chatMessages[chatMessages.length - 1] = {
					role: 'assistant',
					content: 'Something went wrong. Please try again.' // Error fallback
				};
				streaming = false;
				return;
			}

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let fullText = '';

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				fullText += chunk;
				chatMessages[chatMessages.length - 1] = { role: 'assistant', content: fullText };
				await scrollToBottom();
			}

			if (fullText.includes('[PROBLEM_SOLVED]')) {
				onSolved();
			}
		} catch {
			chatMessages[chatMessages.length - 1] = {
				role: 'assistant',
				content: 'Connection error. Please try again.'
			};
		}

		streaming = false;
	}

	async function scrollToBottom() {
		await tick();
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}

	async function sendMessage() {
		const msg = input.trim();
		if (!msg || streaming) return;

		input = '';
		chatMessages = [...chatMessages, { role: 'user', content: msg }];
		streaming = true;
		await scrollToBottom();

		chatMessages = [...chatMessages, { role: 'assistant', content: '' }];

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ problemId, message: msg, currentCode, executionResult })
			});

			if (!res.ok || !res.body) {
				chatMessages[chatMessages.length - 1] = {
					role: 'assistant',
					content: 'Something went wrong. Please try again.' // Error fallback
				};
				streaming = false;
				return;
			}

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let fullText = '';

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				fullText += chunk;
				chatMessages[chatMessages.length - 1] = { role: 'assistant', content: fullText };
				await scrollToBottom();
			}

			if (fullText.includes('[PROBLEM_SOLVED]')) {
				onSolved();
			}
		} catch {
			chatMessages[chatMessages.length - 1] = {
				role: 'assistant',
				content: 'Connection error. Please try again.'
			};
		}

		streaming = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}
</script>

<div class="flex flex-col h-full">
	<div class="border-b px-4 py-2 shrink-0 flex items-center justify-between" style="border-color: var(--border-color);">
		<span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{$t('chat.title')}</span>
		{#if chatMessages.length > 0}
			<button
				onclick={resetConversation}
				disabled={streaming || resetting}
				class="text-xs text-slate-400 hover:text-white disabled:opacity-50 transition-colors"
				title={$t('chat.newConversation')}
			>
				{resetting ? $t('chat.clearing') : $t('chat.newChat')}
			</button>
		{/if}
	</div>

	<div bind:this={chatContainer} class="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
		{#if chatMessages.length === 0}
			<div class="text-center py-12">
				<svg class="w-12 h-12 mx-auto mb-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
				</svg>
				<p class="text-slate-500 text-sm">{$t('chat.emptyTitle')}</p>
				<p class="text-slate-600 text-xs mt-1">{$t('chat.emptyHint')}</p>
			</div>
		{/if}

		{#each chatMessages as msg}
			<ChatMessage role={msg.role} content={msg.content} />
		{/each}

		{#if streaming}
			<div class="flex justify-center">
				<div class="flex gap-1">
					<div class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
					<div class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
					<div class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
				</div>
			</div>
		{/if}
	</div>

	<div class="border-t p-3 shrink-0" style="border-color: var(--border-color);">
		<div class="flex gap-2">
			<textarea
				bind:value={input}
				onkeydown={handleKeydown}
				placeholder={$t('chat.placeholder')}
				rows="2"
				class="flex-1 border rounded-lg px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
				style="background: var(--color-surface); border-color: var(--border-color); color: var(--color-text);"
			></textarea>
			<button
				onclick={sendMessage}
				disabled={streaming || !input.trim()}
				class="self-end bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
			>
				{$t('chat.send')}
			</button>
		</div>
	</div>
</div>
