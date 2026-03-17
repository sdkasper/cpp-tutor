<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let pct = $derived(data.stats.total > 0 ? Math.round((data.stats.completed / data.stats.total) * 100) : 0);
</script>

<svelte:head>
	<title>Progress | C++ Tutor</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-8 page-fade-in">
	<h1 class="text-3xl font-bold mb-8" style="color: var(--color-text);">Your Progress</h1>

	<!-- Stats overview -->
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
		<div class="card p-5 text-center">
			<p class="text-3xl font-bold text-green-400">{data.stats.completed}</p>
			<p class="text-sm text-slate-400 mt-1">Solved</p>
		</div>
		<div class="card p-5 text-center">
			<p class="text-3xl font-bold text-yellow-400">{data.stats.inProgress}</p>
			<p class="text-sm text-slate-400 mt-1">In Progress</p>
		</div>
		<div class="card p-5 text-center">
			<p class="text-3xl font-bold text-slate-300">{data.stats.total}</p>
			<p class="text-sm text-slate-400 mt-1">Total Problems</p>
		</div>
	</div>

	<!-- Progress bar -->
	<div class="mb-8">
		<div class="flex justify-between text-sm mb-2">
			<span class="text-slate-400">Overall Progress</span>
			<span class="font-medium" style="color: var(--color-text);">{pct}%</span>
		</div>
		<div class="h-3 rounded-full border overflow-hidden" style="background: var(--color-surface); border-color: var(--border-color);">
			<div class="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full progress-bar-animate" style="width: {pct}%"></div>
		</div>
	</div>

	<!-- Problem list -->
	{#if data.problems.length === 0}
		<div class="card p-12 text-center">
			<svg class="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
			</svg>
			<p class="text-slate-400 text-lg mb-2">No progress yet</p>
			<p class="text-slate-500 text-sm">Start solving problems to track your progress here.</p>
		</div>
	{:else}
		<div class="space-y-3">
			{#each data.problems as problem}
				{@const status = problem.progress?.status ?? 'not_started'}
				<a href="/tutor/{problem.id}" class="flex items-center justify-between card card-hover px-4 py-3 hover:border-indigo-500/50 transition-all">
					<div class="flex items-center gap-3">
						<div class="w-6 h-6 rounded-full flex items-center justify-center text-xs {status === 'completed' ? 'bg-green-500/20 text-green-400' : status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-slate-500'}">
							{status === 'completed' ? '✓' : status === 'in_progress' ? '◐' : '○'}
						</div>
						<span class="text-sm" style="color: var(--color-text);">{problem.title}</span>
					</div>
					{#if problem.progress}
						<span class="text-xs text-slate-500">{problem.progress.hints_used} hints used</span>
					{/if}
				</a>
			{/each}
		</div>
	{/if}
</div>
