<script lang="ts">
	import type { PageData } from './$types';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import ChatPanel from '$lib/components/ChatPanel.svelte';
	import OutputPanel from '$lib/components/OutputPanel.svelte';
	import { renderMarkdown } from '$lib/utils/markdown';
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();

	let currentCode = $state(data.progress?.current_code || data.problem.starter_code);
	let isSolved = $state(data.progress?.status === 'completed');
	let wasSolved = $state(data.progress?.status === 'completed');
	let checkRequested = $state(false);
	let showCelebration = $state(false);
	let copied = $state(false);
	let resetConfirm = $state(false);
	let activeTab = $state<'problem' | 'editor' | 'chat'>('editor');
	let fullscreen = $state(false);
	let fontSize = $state(14);

	// Execution state
	let isRunning = $state(false);
	let executionResult = $state<{
		stdout: string;
		stderr: string;
		compile_output: string;
		status: 'success' | 'compile_error' | 'runtime_error' | 'timeout' | 'error';
		exit_code: number;
	} | null>(null);
	let stdinInput = $state('');
	let showStdin = $state(false);
	let showOutput = $state(false);

	let descriptionHtml = $derived(renderMarkdown(data.problem.description));

	async function runCode() {
		if (isRunning) return;
		isRunning = true;
		showOutput = true;
		executionResult = null;

		try {
			const res = await fetch('/api/execute', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					code: currentCode,
					stdin: stdinInput,
					problemId: data.problem.id
				})
			});

			if (res.ok) {
				executionResult = await res.json();
			} else {
				const err = await res.json().catch(() => ({ error: 'Execution failed' }));
				executionResult = {
					stdout: '',
					stderr: '',
					compile_output: err.error || 'Execution failed',
					status: 'error',
					exit_code: -1
				};
			}
		} catch {
			executionResult = {
				stdout: '',
				stderr: '',
				compile_output: 'Network error — could not reach the execution service.',
				status: 'error',
				exit_code: -1
			};
		}
		isRunning = false;
	}

	function clearOutput() {
		executionResult = null;
		showOutput = false;
	}

	// Load font size from localStorage
	onMount(() => {
		const stored = localStorage.getItem('editorFontSize');
		if (stored) fontSize = parseInt(stored, 10);

		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'Escape' && fullscreen) {
				fullscreen = false;
			}
			if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
				e.preventDefault();
				checkRequested = true;
			}
			if (e.key === 'F5') {
				e.preventDefault();
				runCode();
			}
		}
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	function handleSolved() {
		isSolved = true;
		if (!wasSolved) {
			showCelebration = true;
			wasSolved = true;
			setTimeout(() => { showCelebration = false; }, 5000);
		}
	}

	async function copyCode() {
		await navigator.clipboard.writeText(currentCode);
		copied = true;
		setTimeout(() => { copied = false; }, 1500);
	}

	function resetCode() {
		if (!resetConfirm) {
			resetConfirm = true;
			setTimeout(() => { resetConfirm = false; }, 3000);
			return;
		}
		currentCode = data.problem.starter_code;
		resetConfirm = false;
	}

	function changeFontSize(delta: number) {
		fontSize = Math.max(10, Math.min(24, fontSize + delta));
		localStorage.setItem('editorFontSize', String(fontSize));
	}

	// Find next problem for "Next Problem" button
	let nextProblemId = $derived.by(() => {
		// We don't have problem list here, so link to problems page
		return null;
	});
</script>

<svelte:head>
	<title>{data.problem.title} | C++ Tutor</title>
</svelte:head>

<!-- Solved celebration overlay -->
{#if showCelebration}
	<div class="celebration-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
		<div class="text-center">
			<div class="checkmark w-20 h-20 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
				<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<h2 class="text-3xl font-bold text-white mb-2">{$t('tutor.problemSolved')}</h2>
			<p class="text-slate-300 mb-6">{$t('tutor.greatWork', { title: data.problem.title })}</p>
			<div class="flex gap-3 justify-center">
				<a
					href="/problems"
					class="bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
				>
					{$t('tutor.backToProblems')}
				</a>
				<button
					onclick={() => showCelebration = false}
					class="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
				>
					{$t('tutor.continueWorking')}
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- Keyboard shortcuts help -->
<div class="h-[calc(100vh-57px)] flex flex-col">
	<!-- Problem header -->
	<div class="border-b px-4 py-3 flex items-center justify-between shrink-0" style="border-color: var(--border-color); background: var(--color-surface);">
		<div class="flex items-center gap-3">
			<a href="/problems" class="text-slate-400 hover:text-white text-sm transition-colors">&larr; {$t('tutor.back')}</a>
			<span class="text-white/20">|</span>
			<h1 class="text-white font-semibold text-sm sm:text-base">{data.problem.title}</h1>
			<span class="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
				{$t(`difficulty.${data.problem.difficulty}`)}
			</span>
			{#if isSolved}
				<span class="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
					{$t('tutor.solved')}
				</span>
			{/if}
		</div>
		<div class="hidden lg:flex items-center gap-2">
			<button
				onclick={() => fullscreen = !fullscreen}
				class="text-xs text-slate-400 hover:text-white px-2 py-1 rounded transition-colors"
				title={fullscreen ? $t('tutor.exitFullscreen') : $t('tutor.fullscreen')}
			>
				{#if fullscreen}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
					</svg>
				{:else}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
					</svg>
				{/if}
			</button>
			<span class="text-xs text-slate-500" title={$t('tutor.shortcuts')}>
				<kbd class="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">F5</kbd> {$t('tutor.run')}
				<span class="mx-1">|</span>
				<kbd class="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">Ctrl</kbd>+<kbd class="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">Enter</kbd> {$t('tutor.check')}
			</span>
		</div>
	</div>

	<!-- Mobile tabs (visible below lg) -->
	<div class="lg:hidden flex border-b shrink-0" style="border-color: var(--border-color);">
		<button
			onclick={() => activeTab = 'problem'}
			class="flex-1 py-2 text-sm text-center transition-colors {activeTab === 'problem' ? 'tab-active' : 'text-slate-400'}"
		>
			{$t('tutor.tabProblem')}
		</button>
		<button
			onclick={() => activeTab = 'editor'}
			class="flex-1 py-2 text-sm text-center transition-colors {activeTab === 'editor' ? 'tab-active' : 'text-slate-400'}"
		>
			{$t('tutor.tabEditor')}
		</button>
		<button
			onclick={() => activeTab = 'chat'}
			class="flex-1 py-2 text-sm text-center transition-colors {activeTab === 'chat' ? 'tab-active' : 'text-slate-400'}"
		>
			{$t('tutor.tabChat')}
		</button>
	</div>

	<!-- Three-pane layout (desktop) / Tabbed (mobile) -->
	<div class="flex-1 flex min-h-0">
		<!-- Problem description -->
		<div class="
			{fullscreen ? 'hidden' : ''}
			{activeTab === 'problem' ? '' : 'hidden lg:block'}
			w-full lg:w-1/4 border-r overflow-y-auto p-4
		" style="border-color: var(--border-color);">
			<h2 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">{$t('tutor.problem')}</h2>
			<div class="prose-rendered text-sm text-slate-300 leading-relaxed">
				{@html descriptionHtml}
			</div>
			{#if data.problem.hints.length > 0}
				<div class="mt-6">
					<h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">{$t('tutor.hints')}</h3>
					<div class="space-y-2">
						{#each data.problem.hints as hint, i}
							<details class="group">
								<summary class="cursor-pointer text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
									{$t('tutor.hint', { n: String(i + 1) })}
								</summary>
								<p class="mt-1 text-sm text-slate-400 pl-4">{hint}</p>
							</details>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<!-- Code editor -->
		<div class="
			{fullscreen ? 'w-full' : (activeTab === 'editor' ? '' : 'hidden lg:flex')}
			{fullscreen ? '' : 'w-full lg:w-[37.5%]'}
			border-r flex flex-col
		" style="border-color: var(--border-color);">
			<div class="border-b px-4 py-2 flex items-center justify-between shrink-0" style="border-color: var(--border-color);">
				<span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{$t('tutor.editor')}</span>
				<div class="flex items-center gap-2">
					<!-- Font size controls -->
					<div class="flex items-center gap-1">
						<button
							onclick={() => changeFontSize(-1)}
							class="text-slate-400 hover:text-white text-xs px-1 py-0.5 rounded transition-colors"
							title={$t('tutor.decreaseFont')}
						>A-</button>
						<span class="text-xs text-slate-500 w-6 text-center">{fontSize}</span>
						<button
							onclick={() => changeFontSize(1)}
							class="text-slate-400 hover:text-white text-xs px-1 py-0.5 rounded transition-colors"
							title={$t('tutor.increaseFont')}
						>A+</button>
					</div>
					<span class="text-white/10">|</span>
					<button
						onclick={copyCode}
						class="text-slate-400 hover:text-white text-xs px-2 py-1 rounded transition-colors"
						title={$t('tutor.copyCode')}
					>
						{copied ? $t('tutor.copied') : $t('tutor.copy')}
					</button>
					<button
						onclick={resetCode}
						class="text-xs px-2 py-1 rounded transition-colors {resetConfirm ? 'text-red-400 hover:text-red-300' : 'text-slate-400 hover:text-white'}"
						title={$t('tutor.resetToStarter')}
					>
						{resetConfirm ? $t('tutor.confirmReset') : $t('tutor.reset')}
					</button>
					<span class="text-white/10">|</span>
					<button
						onclick={runCode}
						disabled={isRunning}
						class="text-white text-xs font-medium px-3 py-1 rounded-md transition-colors disabled:opacity-50"
						style="background: var(--color-primary);"
						title="Run code (F5)"
					>
						{isRunning ? $t('tutor.running') : $t('tutor.run')}
					</button>
					<button
						onclick={() => { checkRequested = true; }}
						class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-md transition-colors"
					>
						{$t('tutor.check')}
					</button>
					<button
						onclick={() => { showStdin = !showStdin; }}
						class="text-xs px-2 py-1 rounded transition-colors {showStdin ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white'}"
						title={$t('tutor.toggleStdin')}
					>
						{$t('tutor.input')}
					</button>
					<span class="text-xs text-slate-500">C++</span>
				</div>
			</div>
			{#if showStdin}
				<div class="border-b px-3 py-2 shrink-0" style="border-color: var(--border-color);">
					<textarea
						bind:value={stdinInput}
						placeholder={$t('tutor.stdinPlaceholder')}
						rows="3"
						class="w-full border rounded px-2 py-1 text-xs resize-none focus:outline-none focus:border-blue-500"
						style="background: var(--color-surface); border-color: var(--border-color); color: var(--color-text); font-family: 'JetBrains Mono', monospace;"
					></textarea>
				</div>
			{/if}
			<div class="{showOutput ? 'h-[65%]' : 'flex-1'} min-h-0">
				<CodeEditor bind:code={currentCode} {fontSize} />
			</div>
			{#if showOutput}
				<div class="h-[35%] min-h-0">
					<OutputPanel result={executionResult} {isRunning} onClear={clearOutput} />
				</div>
			{/if}
		</div>

		<!-- Chat panel -->
		<div class="
			{fullscreen ? 'hidden' : ''}
			{activeTab === 'chat' ? '' : 'hidden lg:flex'}
			w-full lg:w-[37.5%] flex flex-col
		">
			<ChatPanel
				problemId={data.problem.id}
				{currentCode}
				initialMessages={data.chatHistory}
				onSolved={handleSolved}
				bind:checkRequested
				{executionResult}
			/>
		</div>
	</div>
</div>
