<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';

	let { data }: { data: PageData } = $props();

	let searchQuery = $state('');
	let difficultyFilter = $state('all');
	let statusFilter = $state('all');

	const difficulties = ['all', 'beginner', 'easy', 'medium', 'hard'];
	const statuses = ['all', 'not_started', 'in_progress', 'completed'];

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

	let filteredProblems = $derived(
		data.problems.filter((p) => {
			const status = p.progress?.status ?? 'not_started';
			const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesDifficulty = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
			const matchesStatus = statusFilter === 'all' || status === statusFilter;
			return matchesSearch && matchesDifficulty && matchesStatus;
		})
	);

	function getStatusLabel(s: string): string {
		switch (s) {
			case 'all': return $t('problems.all');
			case 'not_started': return $t('problems.notStarted');
			case 'in_progress': return $t('problems.inProgress');
			case 'completed': return $t('problems.solved');
			default: return s;
		}
	}

	function getDifficultyLabel(d: string): string {
		if (d === 'all') return $t('problems.all');
		return $t(`difficulty.${d}`);
	}
</script>

<svelte:head>
	<title>{$t('problems.title')} | C++ Tutor</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 page-fade-in">
	<h1 class="text-3xl font-bold mb-2" style="color: var(--color-text);">{$t('problems.title')}</h1>
	<p class="text-slate-400 mb-6">{$t('problems.subtitle')}</p>

	<!-- Filters toolbar -->
	<div class="card p-4 mb-6 space-y-3">
		<!-- Search -->
		<input
			bind:value={searchQuery}
			type="text"
			placeholder={$t('problems.searchPlaceholder')}
			class="w-full border rounded-lg px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
			style="background: var(--color-surface); border-color: var(--border-color); color: var(--color-text);"
		/>
		<!-- Difficulty pills -->
		<div class="flex flex-wrap gap-2">
			<span class="text-xs text-slate-400 self-center mr-1">{$t('problems.difficulty')}</span>
			{#each difficulties as d}
				<button
					onclick={() => difficultyFilter = d}
					class="text-xs px-3 py-1 rounded-full border transition-colors {difficultyFilter === d ? 'bg-indigo-600 text-white border-indigo-500' : 'border-[var(--border-color)] text-slate-400 hover:text-white'}"
				>
					{getDifficultyLabel(d)}
				</button>
			{/each}
		</div>
		<!-- Status pills -->
		<div class="flex flex-wrap gap-2">
			<span class="text-xs text-slate-400 self-center mr-1">{$t('problems.status')}</span>
			{#each statuses as s}
				<button
					onclick={() => statusFilter = s}
					class="text-xs px-3 py-1 rounded-full border transition-colors {statusFilter === s ? 'bg-indigo-600 text-white border-indigo-500' : 'border-[var(--border-color)] text-slate-400 hover:text-white'}"
				>
					{getStatusLabel(s)}
				</button>
			{/each}
		</div>
	</div>

	{#if data.problems.length === 0}
		<div class="card p-12 text-center">
			<svg class="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
			</svg>
			<p class="text-slate-400 text-lg mb-2">{$t('problems.noProblems')}</p>
			<p class="text-slate-500 text-sm">{$t('problems.noProblemsHint')}</p>
		</div>
	{:else if filteredProblems.length === 0}
		<div class="card p-12 text-center">
			<p class="text-slate-400 text-lg mb-2">{$t('problems.noMatching')}</p>
			<p class="text-slate-500 text-sm">{$t('problems.noMatchingHint')}</p>
		</div>
	{:else}
		<div class="grid gap-4">
			{#each filteredProblems as problem}
				{@const status = problem.progress?.status ?? 'not_started'}
				<a
					href="/tutor/{problem.id}"
					class="group card card-hover p-5 transition-all hover:border-indigo-500/50"
				>
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-2">
								<h2 class="text-lg font-semibold group-hover:text-indigo-300 transition-colors" style="color: var(--color-text);">
									{problem.title}
								</h2>
								<span class="text-xs font-medium px-2 py-0.5 rounded-full border {difficultyColors[problem.difficulty] ?? difficultyColors.beginner}">
									{$t(`difficulty.${problem.difficulty}`)}
								</span>
							</div>
							<p class="text-slate-400 text-sm line-clamp-2">{problem.description.slice(0, 200)}</p>
						</div>
						<div class="shrink-0">
							{#if status === 'completed'}
								<span class="inline-flex items-center gap-1.5 text-sm text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
									{statusIcons[status]} {$t('problems.solved')}
								</span>
							{:else if status === 'in_progress'}
								<span class="inline-flex items-center gap-1.5 text-sm text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full">
									{statusIcons[status]} {$t('problems.inProgress')}
								</span>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
