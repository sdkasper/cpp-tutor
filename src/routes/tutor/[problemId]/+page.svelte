<script lang="ts">
	import type { PageData } from './$types';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import ChatPanel from '$lib/components/ChatPanel.svelte';

	let { data }: { data: PageData } = $props();

	let currentCode = $state(data.progress?.current_code || data.problem.starter_code);
	let isSolved = $state(data.progress?.status === 'completed');
	let checkRequested = $state(false);
</script>

<div class="h-[calc(100vh-57px)] flex flex-col">
	<!-- Problem header -->
	<div class="border-b border-white/10 bg-[#1e1e2e] px-4 py-3 flex items-center justify-between shrink-0">
		<div class="flex items-center gap-3">
			<a href="/problems" class="text-slate-400 hover:text-white text-sm transition-colors">&larr; Back</a>
			<span class="text-white/20">|</span>
			<h1 class="text-white font-semibold">{data.problem.title}</h1>
			<span class="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
				{data.problem.difficulty}
			</span>
			{#if isSolved}
				<span class="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
					Solved!
				</span>
			{/if}
		</div>
	</div>

	<!-- Three-pane layout -->
	<div class="flex-1 flex min-h-0">
		<!-- Problem description -->
		<div class="w-1/4 border-r border-white/10 overflow-y-auto p-4">
			<h2 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Problem</h2>
			<div class="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
				{data.problem.description}
			</div>
			{#if data.problem.hints.length > 0}
				<div class="mt-6">
					<h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Hints</h3>
					<div class="space-y-2">
						{#each data.problem.hints as hint, i}
							<details class="group">
								<summary class="cursor-pointer text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
									Hint {i + 1}
								</summary>
								<p class="mt-1 text-sm text-slate-400 pl-4">{hint}</p>
							</details>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<!-- Code editor -->
		<div class="w-[37.5%] border-r border-white/10 flex flex-col">
			<div class="border-b border-white/10 px-4 py-2 flex items-center justify-between shrink-0">
				<span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Editor</span>
				<div class="flex items-center gap-2">
					<button
						onclick={() => { checkRequested = true; }}
						class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-md transition-colors"
					>
						Check
					</button>
					<span class="text-xs text-slate-500">C++</span>
				</div>
			</div>
			<div class="flex-1 min-h-0">
				<CodeEditor bind:code={currentCode} />
			</div>
		</div>

		<!-- Chat panel -->
		<div class="w-[37.5%] flex flex-col">
			<ChatPanel
				problemId={data.problem.id}
				{currentCode}
				initialMessages={data.chatHistory}
				onSolved={() => { isSolved = true; }}
				bind:checkRequested
			/>
		</div>
	</div>
</div>
