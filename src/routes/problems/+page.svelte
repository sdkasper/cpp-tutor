<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const difficultyColors: Record<string, string> = {
		beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
		easy: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
		hard: 'bg-red-500/20 text-red-400 border-red-500/30'
	};

	const statusIcons: Record<string, string> = {
		completed: '✓',
		in_progress: '◐',
		not_started: ''
	};
</script>

<div class="mx-auto max-w-4xl px-4 py-8">
	<h1 class="text-3xl font-bold text-white mb-2">Problems</h1>
	<p class="text-slate-400 mb-8">Choose a problem to start practicing. Your AI tutor will guide you through it.</p>

	{#if data.problems.length === 0}
		<div class="rounded-xl bg-[#2a2a3e] border border-white/10 p-12 text-center">
			<p class="text-slate-400 text-lg mb-2">No problems yet!</p>
			<p class="text-slate-500 text-sm">Add markdown files to <code class="text-indigo-400">content/problems/</code> and restart the server.</p>
		</div>
	{:else}
		<div class="grid gap-4">
			{#each data.problems as problem}
				{@const status = problem.progress?.status ?? 'not_started'}
				<a
					href="/tutor/{problem.id}"
					class="group rounded-xl bg-[#2a2a3e] border border-white/10 hover:border-indigo-500/50 p-5 transition-all hover:bg-[#2f2f44]"
				>
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-2">
								<h2 class="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
									{problem.title}
								</h2>
								<span class="text-xs font-medium px-2 py-0.5 rounded-full border {difficultyColors[problem.difficulty] ?? difficultyColors.beginner}">
									{problem.difficulty}
								</span>
							</div>
							<p class="text-slate-400 text-sm line-clamp-2">{problem.description.slice(0, 200)}</p>
						</div>
						<div class="shrink-0">
							{#if status === 'completed'}
								<span class="inline-flex items-center gap-1.5 text-sm text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
									{statusIcons[status]} Solved
								</span>
							{:else if status === 'in_progress'}
								<span class="inline-flex items-center gap-1.5 text-sm text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full">
									{statusIcons[status]} In Progress
								</span>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
