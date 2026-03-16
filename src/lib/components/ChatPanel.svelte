<script lang="ts">
	import { tick, untrack } from 'svelte';
	import ChatMessage from './ChatMessage.svelte';

	interface Props {
		problemId: string;
		currentCode: string;
		initialMessages: { role: string; content: string }[];
		onSolved: () => void;
		checkRequested?: boolean;
	}

	let { problemId, currentCode, initialMessages, onSolved, checkRequested = $bindable(false) }: Props = $props();

	let chatMessages = $state<{ role: string; content: string }[]>([...initialMessages]);
	let input = $state('');
	let streaming = $state(false);
	let chatContainer: HTMLDivElement;

	$effect(() => {
		if (checkRequested) {
			untrack(() => {
				sendCheckRequest();
				checkRequested = false;
			});
		}
	});

	async function sendCheckRequest() {
		if (streaming) return;
		const msg = `[CHECK] Please review my current code below. Check if it solves the problem correctly, point out any errors or issues, and tell me what to fix — but guide me with questions, don't give the full solution.

\`\`\`cpp
${currentCode}
\`\`\``;
		chatMessages = [...chatMessages, { role: 'user', content: 'Check my code' }];
		streaming = true;
		await scrollToBottom();
		chatMessages = [...chatMessages, { role: 'assistant', content: '' }];

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ problemId, message: msg, currentCode })
			});

			if (!res.ok || !res.body) {
				chatMessages[chatMessages.length - 1] = {
					role: 'assistant',
					content: 'Something went wrong. Please try again.'
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

		// Add placeholder for assistant response
		chatMessages = [...chatMessages, { role: 'assistant', content: '' }];

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ problemId, message: msg, currentCode })
			});

			if (!res.ok || !res.body) {
				chatMessages[chatMessages.length - 1] = {
					role: 'assistant',
					content: 'Something went wrong. Please try again.'
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
	<div class="border-b border-white/10 px-4 py-2 shrink-0">
		<span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Tutor</span>
	</div>

	<div bind:this={chatContainer} class="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
		{#if chatMessages.length === 0}
			<div class="text-center py-8">
				<p class="text-slate-500 text-sm">Ask your tutor for help! They'll guide you with questions and hints.</p>
				<p class="text-slate-600 text-xs mt-2">Try: "I don't know where to start" or "What's wrong with my code?"</p>
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

	<div class="border-t border-white/10 p-3 shrink-0">
		<div class="flex gap-2">
			<textarea
				bind:value={input}
				onkeydown={handleKeydown}
				placeholder="Ask your tutor..."
				rows="2"
				class="flex-1 bg-[#1e1e2e] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
			></textarea>
			<button
				onclick={sendMessage}
				disabled={streaming || !input.trim()}
				class="self-end bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
			>
				Send
			</button>
		</div>
	</div>
</div>
