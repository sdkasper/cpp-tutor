<script lang="ts">
	import CodeEditor from './CodeEditor.svelte';
	import OutputPanel from './OutputPanel.svelte';
	import { t } from '$lib/i18n';

	interface Props {
		initialCode: string;
		readOnly?: boolean;
	}

	let { initialCode, readOnly = false }: Props = $props();

	let code = $state(initialCode);
	let isRunning = $state(false);
	let result = $state<{
		stdout: string;
		stderr: string;
		compile_output: string;
		status: 'success' | 'compile_error' | 'runtime_error' | 'timeout' | 'error';
		exit_code: number;
	} | null>(null);

	let showOutput = $derived(isRunning || result !== null);

	async function runCode() {
		isRunning = true;
		result = null;

		try {
			const res = await fetch('/api/execute', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code, stdin: '' })
			});
			result = await res.json();
		} catch {
			result = {
				stdout: '',
				stderr: 'Failed to connect to execution server.', // fallback, not i18n'd since it's data
				compile_output: '',
				status: 'error',
				exit_code: 1
			};
		} finally {
			isRunning = false;
		}
	}

	function reset() {
		code = initialCode;
		result = null;
	}
</script>

<div class="runnable-code rounded-lg overflow-hidden border" style="border-color: var(--border-color);">
	<div class="flex items-center justify-between px-3 py-1.5" style="background: var(--color-surface-raised); border-bottom: 1px solid var(--border-color);">
		<span class="text-xs font-medium" style="color: var(--color-text-muted);">{$t('runnable.lang')}</span>
		<div class="flex gap-2">
			{#if !readOnly}
				<button
					onclick={reset}
					class="text-xs px-2 py-0.5 rounded transition-colors hover:bg-white/10"
					style="color: var(--color-text-muted);"
				>
					{$t('runnable.reset')}
				</button>
			{/if}
			<button
				onclick={runCode}
				disabled={isRunning}
				class="text-xs px-3 py-0.5 rounded font-medium transition-colors bg-green-600 hover:bg-green-500 text-white disabled:opacity-50"
			>
				{isRunning ? $t('runnable.running') : $t('runnable.run')}
			</button>
		</div>
	</div>
	<div class="editor-area" style="height: {readOnly ? '120px' : '160px'};">
		<CodeEditor bind:code fontSize={13} />
	</div>
	{#if showOutput}
		<div class="output-area">
			<OutputPanel {result} {isRunning} onClear={() => result = null} />
		</div>
	{/if}
</div>

<style>
	.editor-area {
		min-height: 80px;
	}

	.output-area {
		min-height: 60px;
		max-height: 300px;
		overflow-y: auto;
	}

	.runnable-code {
		margin: 1rem 0;
	}
</style>
