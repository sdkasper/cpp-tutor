<script lang="ts">
	import RunnableCode from './RunnableCode.svelte';

	interface Props {
		description: string;
		starterCode: string;
		hint?: string;
	}

	let { description, starterCode, hint }: Props = $props();

	let showHint = $state(false);
</script>

<div class="exercise-block rounded-lg border p-4 my-6" style="border-color: var(--color-primary); background: color-mix(in srgb, var(--color-primary) 5%, var(--color-surface));">
	<div class="flex items-center gap-2 mb-3">
		<span class="text-sm font-bold px-2 py-0.5 rounded" style="background: var(--color-primary); color: white;">Try it yourself</span>
	</div>
	<div class="text-sm mb-3" style="color: var(--color-text);">
		{@html description}
	</div>
	<RunnableCode initialCode={starterCode} />
	{#if hint}
		<div class="mt-2">
			{#if showHint}
				<p class="text-sm px-3 py-2 rounded" style="background: var(--color-surface-raised); color: var(--color-text-muted);">
					{hint}
				</p>
			{:else}
				<button
					onclick={() => showHint = true}
					class="text-xs px-2 py-1 rounded transition-colors hover:bg-white/10"
					style="color: var(--color-text-muted);"
				>
					Need a hint?
				</button>
			{/if}
		</div>
	{/if}
</div>
