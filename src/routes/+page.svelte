<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';

	let { data }: { data: PageData } = $props();


	let name = $state('');
	let existingStudents = $state(data.students);
	let loading = $state(false);
	let error = $state('');

	async function createStudent() {
		if (!name.trim()) return;
		loading = true;
		error = '';

		const res = await fetch('/api/students', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: name.trim() })
		});

		if (!res.ok) {
			error = (await res.json()).error ?? 'Failed to create student';
			loading = false;
			return;
		}

		window.location.href = '/problems';
	}

	async function selectStudent(id: string) {
		loading = true;
		await fetch('/api/students', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id })
		});
		window.location.href = '/problems';
	}
</script>

<svelte:head>
	<title>Welcome | C++ Tutor</title>
</svelte:head>

<div class="mx-auto max-w-lg px-4 py-16 page-fade-in">
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold text-white mb-3">{$t('home.title')}</h1>
		<p class="text-slate-400 text-lg">{$t('home.subtitle')}</p>
	</div>

	{#if data.student}
		<div class="rounded-xl bg-[#2a2a3e] border border-white/10 p-6 mb-6 text-center">
			<p class="text-slate-300 mb-3">{$t('home.welcomeBack', { name: data.student.name })}</p>
			<a href="/problems" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
				{$t('home.continueLearning')}
			</a>
		</div>
	{/if}

	<div class="rounded-xl bg-[#2a2a3e] border border-white/10 p-6">
		<h2 class="text-lg font-semibold text-white mb-4">
			{data.student ? $t('home.switchStudent') : $t('home.getStarted')}
		</h2>

		<form onsubmit={(e) => { e.preventDefault(); createStudent(); }} class="flex gap-3 mb-6">
			<input
				bind:value={name}
				placeholder={$t('home.namePlaceholder')}
				class="flex-1 bg-[#1e1e2e] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
			/>
			<button
				type="submit"
				disabled={loading || !name.trim()}
				class="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
			>
				{$t('home.start')}
			</button>
		</form>

		{#if error}
			<p class="text-red-400 text-sm mb-4">{error}</p>
		{/if}

		{#if existingStudents.length > 0}
			<div class="border-t border-white/10 pt-4">
				<p class="text-sm text-slate-400 mb-3">{$t('home.pickProfile')}</p>
				<div class="flex flex-wrap gap-2">
					{#each existingStudents as student}
						<button
							onclick={() => selectStudent(student.id)}
							class="bg-[#1e1e2e] hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/50 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-all"
						>
							{student.name}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
