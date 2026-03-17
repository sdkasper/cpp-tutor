<script lang="ts">
	interface ExecutionResult {
		stdout: string;
		stderr: string;
		compile_output: string;
		status: 'success' | 'compile_error' | 'runtime_error' | 'timeout' | 'error';
		exit_code: number;
	}

	interface Props {
		result: ExecutionResult | null;
		isRunning: boolean;
		onClear: () => void;
	}

	let { result, isRunning, onClear }: Props = $props();

	let statusLabel = $derived.by(() => {
		if (isRunning) return 'Running...';
		if (!result) return '';
		switch (result.status) {
			case 'success': return 'Success';
			case 'compile_error': return 'Compilation Error';
			case 'runtime_error': return 'Runtime Error';
			case 'timeout': return 'Time Limit Exceeded';
			case 'error': return 'Error';
		}
	});

	let statusClass = $derived.by(() => {
		if (isRunning || !result) return '';
		switch (result.status) {
			case 'success': return 'output-success';
			case 'compile_error':
			case 'runtime_error':
			case 'timeout':
			case 'error': return 'output-error';
		}
	});
</script>

<div class="output-panel flex flex-col h-full">
	<div class="output-header flex items-center justify-between px-3 py-1.5 shrink-0" style="border-color: var(--border-color);">
		<div class="flex items-center gap-2">
			<span class="text-xs font-semibold uppercase tracking-wider" style="color: var(--color-text-muted);">Output</span>
			{#if statusLabel}
				<span class="text-xs font-medium {statusClass}">{statusLabel}</span>
			{/if}
		</div>
		{#if result || isRunning}
			<button
				onclick={onClear}
				class="text-xs px-2 py-0.5 rounded transition-colors"
				style="color: var(--color-text-muted);"
				disabled={isRunning}
			>
				Clear
			</button>
		{/if}
	</div>

	<div class="flex-1 overflow-y-auto px-3 py-2 min-h-0">
		{#if isRunning}
			<div class="flex items-center gap-2 py-4 justify-center">
				<div class="spinner"></div>
				<span class="text-sm" style="color: var(--color-text-muted);">Compiling and running...</span>
			</div>
		{:else if result}
			{#if result.compile_output}
				<div class="mb-2">
					<span class="text-xs font-semibold uppercase tracking-wider output-error">Compiler</span>
					<pre class="output-pre output-error-text mt-1">{result.compile_output}</pre>
				</div>
			{/if}
			{#if result.stdout}
				<div class="mb-2">
					{#if result.compile_output || result.stderr}
						<span class="text-xs font-semibold uppercase tracking-wider output-success">Output</span>
					{/if}
					<pre class="output-pre output-success-text mt-1">{result.stdout}</pre>
				</div>
			{/if}
			{#if result.stderr}
				<div class="mb-2">
					<span class="text-xs font-semibold uppercase tracking-wider output-error">Stderr</span>
					<pre class="output-pre output-error-text mt-1">{result.stderr}</pre>
				</div>
			{/if}
			{#if result.status === 'success' && !result.stdout && !result.stderr}
				<p class="text-sm py-2" style="color: var(--color-text-muted);">Program finished with no output.</p>
			{/if}
			{#if result.status === 'timeout'}
				<p class="text-sm py-2 output-error">Program exceeded the 5-second time limit.</p>
			{/if}
		{:else}
			<p class="text-sm py-2" style="color: var(--color-text-muted);">Run your code to see output here.</p>
		{/if}
	</div>
</div>

<style>
	.output-panel {
		background: var(--color-surface);
		border-top: 1px solid var(--border-color);
	}

	.output-header {
		border-bottom: 1px solid var(--border-color);
	}

	.output-pre {
		font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 0.8125rem;
		line-height: 1.5;
		white-space: pre-wrap;
		word-break: break-all;
		margin: 0;
	}

	.output-success { color: var(--color-success); }
	.output-error { color: var(--color-danger); }

	.output-success-text { color: var(--color-text); }
	.output-error-text { color: var(--color-danger); }

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid var(--border-color);
		border-top-color: var(--color-primary);
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
