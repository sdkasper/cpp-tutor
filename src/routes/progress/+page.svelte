<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let pct = $derived(data.stats.total > 0 ? Math.round((data.stats.completed / data.stats.total) * 100) : 0);
</script>

<div class="mx-auto max-w-3xl px-4 py-8">
	<h1 class="text-3xl font-bold text-white mb-8">Your Progress</h1>

	<!-- Stats overview -->
	<div class="grid grid-cols-3 gap-4 mb-8">
		<div class="rounded-xl bg-[#2a2a3e] border border-white/10 p-5 text-center">
			<p class="text-3xl font-bold text-green-400">{data.stats.completed}</p>
			<p class="text-sm text-slate-400 mt-1">Solved</p>
		</div>
		<div class="rounded-xl bg-[#2a2a3e] border border-white/10 p-5 text-center">
			<p class="text-3xl font-bold text-yellow-400">{data.stats.inProgress}</p>
			<p class="text-sm text-slate-400 mt-1">In Progress</p>
		</div>
		<div class="rounded-xl bg-[#2a2a3e] border border-white/10 p-5 text-center">
			<p class="text-3xl font-bold text-slate-300">{data.stats.total}</p>
			<p class="text-sm text-slate-400 mt-1">Total Problems</p>
		</div>
	</div>

	<!-- Progress bar -->
	<div class="mb-8">
		<div class="flex justify-between text-sm mb-2">
			<span class="text-slate-400">Overall Progress</span>
			<span class="text-white font-medium">{pct}%</span>
		</div>
		<div class="h-3 bg-[#1e1e2e] rounded-full border border-white/10 overflow-hidden">
			<div class="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full transition-all duration-500" style="width: {pct}%"></div>
		</div>
	</div>

	<!-- Problem list -->
	<div class="space-y-3">
		{#each data.problems as problem}
			{@const status = problem.progress?.status ?? 'not_started'}
			<a href="/tutor/{problem.id}" class="flex items-center justify-between rounded-lg bg-[#2a2a3e] border border-white/10 px-4 py-3 hover:border-indigo-500/50 transition-all">
				<div class="flex items-center gap-3">
					<div class="w-6 h-6 rounded-full flex items-center justify-center text-xs {status === 'completed' ? 'bg-green-500/20 text-green-400' : status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-slate-500'}">
						{status === 'completed' ? '✓' : status === 'in_progress' ? '◐' : '○'}
					</div>
					<span class="text-white text-sm">{problem.title}</span>
				</div>
				{#if problem.progress}
					<span class="text-xs text-slate-500">{problem.progress.hints_used} hints used</span>
				{/if}
			</a>
		{/each}
	</div>
</div>
