<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorView, keymap } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { indentUnit } from '@codemirror/language';
	import { indentWithTab } from '@codemirror/commands';
	import { basicSetup } from 'codemirror';
	import { cpp } from '@codemirror/lang-cpp';
	import { oneDark } from '@codemirror/theme-one-dark';

	let { code = $bindable('') }: { code: string } = $props();

	let editorContainer: HTMLDivElement;
	let view: EditorView;

	onMount(() => {
		const updateListener = EditorView.updateListener.of((update) => {
			if (update.docChanged) {
				code = update.state.doc.toString();
			}
		});

		view = new EditorView({
			state: EditorState.create({
				doc: code,
				extensions: [
					basicSetup,
					indentUnit.of('    '),
					keymap.of([indentWithTab]),
					cpp(),
					oneDark,
					updateListener,
					EditorView.theme({
						'&': { height: '100%', fontSize: '14px' },
						'.cm-scroller': { overflow: 'auto', fontFamily: "'JetBrains Mono', monospace" },
						'.cm-content': { padding: '12px 0' },
						'.cm-gutters': { borderRight: '1px solid rgba(255,255,255,0.1)', fontFamily: "'JetBrains Mono', monospace" }
					})
				]
			}),
			parent: editorContainer
		});

		return () => view.destroy();
	});
</script>

<div bind:this={editorContainer} class="h-full w-full"></div>
