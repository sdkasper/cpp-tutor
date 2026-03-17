<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorView, keymap } from '@codemirror/view';
	import { EditorState, Compartment } from '@codemirror/state';
	import { indentUnit } from '@codemirror/language';
	import { indentWithTab } from '@codemirror/commands';
	import { basicSetup } from 'codemirror';
	import { cpp } from '@codemirror/lang-cpp';
	import { oneDark } from '@codemirror/theme-one-dark';

	let { code = $bindable(''), fontSize = 14 }: { code: string; fontSize?: number } = $props();

	let editorContainer: HTMLDivElement;
	let view: EditorView;
	let viewReady = $state(false);
	let ignoreUpdate = false;
	let fontSizeCompartment = new Compartment();

	function makeEditorTheme(size: number) {
		return EditorView.theme({
			'&': { height: '100%', fontSize: `${size}px` },
			'.cm-scroller': { overflow: 'auto', fontFamily: "'JetBrains Mono', monospace" },
			'.cm-content': { padding: '12px 0' },
			'.cm-gutters': { borderRight: '1px solid rgba(255,255,255,0.1)', fontFamily: "'JetBrains Mono', monospace" }
		});
	}

	// React to external code changes (e.g., reset)
	$effect(() => {
		const currentCode = code; // always read → always tracked
		if (viewReady && currentCode !== view.state.doc.toString()) {
			ignoreUpdate = true;
			view.dispatch({
				changes: { from: 0, to: view.state.doc.length, insert: currentCode }
			});
			ignoreUpdate = false;
		}
	});

	// React to font size changes
	$effect(() => {
		const size = fontSize; // always read → always tracked
		if (viewReady) {
			view.dispatch({
				effects: fontSizeCompartment.reconfigure(makeEditorTheme(size))
			});
		}
	});

	onMount(() => {
		const updateListener = EditorView.updateListener.of((update) => {
			if (update.docChanged && !ignoreUpdate) {
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
					fontSizeCompartment.of(makeEditorTheme(fontSize))
				]
			}),
			parent: editorContainer
		});

		viewReady = true;
		return () => view.destroy();
	});
</script>

<div bind:this={editorContainer} class="h-full w-full"></div>
