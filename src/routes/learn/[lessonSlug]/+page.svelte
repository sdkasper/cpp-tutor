<script lang="ts">
	import type { PageData } from './$types';
	import LessonRenderer from '$lib/components/LessonRenderer.svelte';
	import { t } from '$lib/i18n';

	let { data }: { data: PageData } = $props();

	let isCompleted = $state(data.progress.status === 'completed');

	const difficultyColors: Record<string, string> = {
		beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
		easy: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
		hard: 'bg-red-500/20 text-red-400 border-red-500/30'
	};

	async function markComplete() {
		const res = await fetch('/api/lessons/progress', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ lessonId: data.lesson.id, status: 'completed' })
		});
		if (res.ok) {
			isCompleted = true;
		}
	}
</script>

<svelte:head>
	<title>{data.lesson.title} | {$t('learn.title')} | C++ Tutor</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-8 page-fade-in">
	<!-- Lesson header -->
	<div class="mb-8">
		<a href="/learn" class="text-sm transition-colors hover:text-indigo-300 mb-3 inline-block" style="color: var(--color-text-muted);">
			&larr; {$t('learn.allLessons')}
		</a>
		<h1 class="text-3xl font-bold mb-2" style="color: var(--color-text);">{data.lesson.title}</h1>
		{#if data.lesson.summary}
			<p class="text-slate-400">{data.lesson.summary}</p>
		{/if}
		<div class="flex items-center gap-3 mt-3">
			<span class="text-xs" style="color: var(--color-text-muted);">{$t('learn.minutes', { min: String(data.lesson.estimated_minutes) })}</span>
			{#if isCompleted}
				<span class="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">{$t('learn.completed')}</span>
			{/if}
		</div>
	</div>

	<!-- Lesson content -->
	<LessonRenderer content={data.lesson.content} />

	<!-- Mark as complete -->
	{#if !isCompleted}
		<div class="mt-12 text-center">
			<button
				onclick={markComplete}
				class="px-6 py-3 rounded-lg font-medium transition-colors bg-green-600 hover:bg-green-500 text-white"
			>
				{$t('learn.markComplete')}
			</button>
		</div>
	{:else}
		<div class="mt-12 text-center">
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-400">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
				{$t('learn.lessonCompleted')}
			</div>
		</div>
	{/if}

	<!-- Practice problems (concept-linked) -->
	{#if data.matchingProblems.length > 0}
		<div class="mt-12 pt-8 border-t" style="border-color: var(--border-color);">
			<h2 class="text-xl font-bold mb-4" style="color: var(--color-text);">{$t('learn.practiceProblems')}</h2>
			<p class="text-sm text-slate-400 mb-4">{$t('learn.practiceSubtitle')}</p>
			<div class="grid gap-3">
				{#each data.matchingProblems as problem}
					<a
						href="/tutor/{problem.id}"
						class="group card card-hover p-4 transition-all hover:border-indigo-500/50"
					>
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-3">
								<h3 class="font-medium group-hover:text-indigo-300 transition-colors" style="color: var(--color-text);">
									{problem.title}
								</h3>
								<span class="text-xs font-medium px-2 py-0.5 rounded-full border {difficultyColors[problem.difficulty] ?? difficultyColors.beginner}">
									{$t(`difficulty.${problem.difficulty}`)}
								</span>
							</div>
							<svg class="w-4 h-4 text-slate-500 group-hover:text-indigo-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Lesson navigation -->
	<div class="mt-12 pt-8 border-t flex justify-between" style="border-color: var(--border-color);">
		{#if data.lesson.prev_lesson}
			<a href="/learn/{data.lesson.prev_lesson}" class="group flex items-center gap-2 text-sm transition-colors" style="color: var(--color-text-muted);">
				<svg class="w-4 h-4 group-hover:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				<span class="group-hover:text-indigo-300">{$t('learn.prevLesson')}</span>
			</a>
		{:else}
			<div></div>
		{/if}
		{#if data.lesson.next_lesson}
			<a href="/learn/{data.lesson.next_lesson}" class="group flex items-center gap-2 text-sm transition-colors" style="color: var(--color-text-muted);">
				<span class="group-hover:text-indigo-300">{$t('learn.nextLesson')}</span>
				<svg class="w-4 h-4 group-hover:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		{/if}
	</div>
</div>
