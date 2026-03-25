<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const conceptColors: Record<string, string> = {
		output: 'bg-green-500/20 text-green-400',
		variables: 'bg-blue-500/20 text-blue-400',
		input: 'bg-cyan-500/20 text-cyan-400',
		'if-else': 'bg-yellow-500/20 text-yellow-400',
		loops: 'bg-orange-500/20 text-orange-400',
		functions: 'bg-purple-500/20 text-purple-400',
		arrays: 'bg-red-500/20 text-red-400',
		strings: 'bg-pink-500/20 text-pink-400',
		structs: 'bg-indigo-500/20 text-indigo-400',
		'file-io': 'bg-teal-500/20 text-teal-400'
	};

	function getConceptColor(concept: string): string {
		for (const [key, color] of Object.entries(conceptColors)) {
			if (concept.includes(key)) return color;
		}
		return 'bg-slate-500/20 text-slate-400';
	}

	// Find the first incomplete lesson for "Continue" card
	let continueLesson = $derived(
		data.lessons.find((l) => {
			const status = l.progress?.status ?? 'not_started';
			return status === 'in_progress';
		}) ?? data.lessons.find((l) => !l.progress || l.progress.status === 'not_started')
	);
</script>

<svelte:head>
	<title>Learn C++ | C++ Tutor</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 page-fade-in">
	<h1 class="text-3xl font-bold mb-2" style="color: var(--color-text);">Learn C++</h1>
	<p class="text-slate-400 mb-6">Work through these lessons in order. Each one teaches a new concept with examples you can run and exercises to try.</p>

	{#if continueLesson && data.lessons.length > 1}
		<a
			href="/learn/{continueLesson.slug}"
			class="group card card-hover p-4 mb-8 transition-all hover:border-indigo-500/50 flex items-center gap-4"
		>
			<div class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500/20 text-indigo-400">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
				</svg>
			</div>
			<div class="flex-1 min-w-0">
				<span class="text-xs font-medium uppercase tracking-wider" style="color: var(--color-primary);">
					{continueLesson.progress?.status === 'in_progress' ? 'Continue learning' : 'Start here'}
				</span>
				<h2 class="text-base font-semibold group-hover:text-indigo-300 transition-colors" style="color: var(--color-text);">
					{continueLesson.title}
				</h2>
			</div>
			<svg class="w-5 h-5 shrink-0 text-slate-400 group-hover:text-indigo-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</a>
	{/if}

	{#if data.lessons.length === 0}
		<div class="card p-12 text-center">
			<p class="text-slate-400 text-lg mb-2">No lessons yet!</p>
			<p class="text-slate-500 text-sm">Lessons will appear here once content is added to <code class="text-indigo-400">content/lessons/</code>.</p>
		</div>
	{:else}
		<div class="grid gap-3">
			{#each data.lessons as lesson, i}
				{@const status = lesson.progress?.status ?? 'not_started'}
				<a
					href="/learn/{lesson.slug}"
					class="group card card-hover p-4 transition-all hover:border-indigo-500/50"
				>
					<div class="flex items-center gap-4">
						<!-- Lesson number / status -->
						<div class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold {
							status === 'completed' ? 'bg-green-500/20 text-green-400' :
							status === 'in_progress' ? 'bg-indigo-500/20 text-indigo-400' :
							'bg-slate-500/20 text-slate-500'
						}">
							{#if status === 'completed'}
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
								</svg>
							{:else}
								{i + 1}
							{/if}
						</div>

						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-2 mb-1">
								<h2 class="text-base font-semibold group-hover:text-indigo-300 transition-colors truncate" style="color: var(--color-text);">
									{lesson.title}
								</h2>
								<span class="text-xs shrink-0" style="color: var(--color-text-muted);">
									~{lesson.estimated_minutes} min
								</span>
							</div>
							{#if lesson.summary}
								<p class="text-sm text-slate-400 truncate">{lesson.summary}</p>
							{/if}
							{#if lesson.concepts.length > 0}
								<div class="flex flex-wrap gap-1 mt-1.5">
									{#each lesson.concepts as concept}
										<span class="text-[10px] px-1.5 py-0.5 rounded-full {getConceptColor(concept)}">
											{concept}
										</span>
									{/each}
								</div>
							{/if}
						</div>

						<svg class="w-5 h-5 shrink-0 text-slate-500 group-hover:text-indigo-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
