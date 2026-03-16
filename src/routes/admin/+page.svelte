<script lang="ts">
	let title = $state('');
	let difficulty = $state('beginner');
	let file: File | null = $state(null);
	let uploading = $state(false);
	let message = $state('');
	let syncing = $state(false);
	let mdFile: File | null = $state(null);
	let uploadingMd = $state(false);

	async function uploadPdf() {
		if (!file || !title.trim()) return;
		uploading = true;
		message = '';

		const formData = new FormData();
		formData.append('file', file);
		formData.append('title', title.trim());
		formData.append('difficulty', difficulty);

		const res = await fetch('/api/content/upload', { method: 'POST', body: formData });
		if (res.ok) {
			message = 'Problem created from PDF!';
			title = '';
			file = null;
		} else {
			message = 'Upload failed. Please try again.';
		}
		uploading = false;
	}

	async function uploadMarkdown() {
		if (!mdFile) return;
		uploadingMd = true;
		message = '';

		const formData = new FormData();
		formData.append('file', mdFile);

		const res = await fetch('/api/content/upload', { method: 'POST', body: formData });
		if (res.ok) {
			const data = await res.json();
			message = `Problem "${data.title}" imported from Markdown!`;
			mdFile = null;
		} else {
			const err = await res.json().catch(() => ({ error: 'Upload failed' }));
			message = err.error || 'Upload failed. Please try again.';
		}
		uploadingMd = false;
	}

	async function syncContent() {
		syncing = true;
		await fetch('/api/content/sync', { method: 'POST' });
		syncing = false;
		message = 'Markdown files synced!';
	}

	function handleFileInput(e: Event) {
		const target = e.target as HTMLInputElement;
		file = target.files?.[0] ?? null;
	}

	function handleMdFileInput(e: Event) {
		const target = e.target as HTMLInputElement;
		mdFile = target.files?.[0] ?? null;
	}
</script>

<div class="mx-auto max-w-2xl px-4 py-8">
	<h1 class="text-3xl font-bold text-white mb-8">Admin</h1>

	{#if message}
		<div class="rounded-lg bg-indigo-500/10 border border-indigo-500/30 px-4 py-3 text-sm text-indigo-300 mb-6">
			{message}
		</div>
	{/if}

	<!-- Sync markdown -->
	<div class="rounded-xl bg-[#2a2a3e] border border-white/10 p-6 mb-6">
		<h2 class="text-lg font-semibold text-white mb-3">Sync Markdown Problems</h2>
		<p class="text-sm text-slate-400 mb-4">Re-scan <code class="text-indigo-400">content/problems/</code> and update the database.</p>
		<button
			onclick={syncContent}
			disabled={syncing}
			class="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
		>
			{syncing ? 'Syncing...' : 'Sync Now'}
		</button>
	</div>

	<!-- Upload Markdown -->
	<div class="rounded-xl bg-[#2a2a3e] border border-white/10 p-6 mb-6">
		<h2 class="text-lg font-semibold text-white mb-3">Upload Markdown Problem</h2>
		<p class="text-sm text-slate-400 mb-4">Import a <code class="text-indigo-400">.md</code> file with YAML frontmatter (title, difficulty, hints, starter_code). The file is saved to <code class="text-indigo-400">content/problems/</code> and synced to the database.</p>

		<div class="space-y-4">
			<div>
				<label for="md-file" class="block text-sm font-medium text-slate-300 mb-1">Markdown File</label>
				<input
					id="md-file"
					type="file"
					accept=".md"
					onchange={handleMdFileInput}
					class="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
				/>
			</div>

			<button
				onclick={uploadMarkdown}
				disabled={uploadingMd || !mdFile}
				class="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
			>
				{uploadingMd ? 'Uploading...' : 'Upload & Import'}
			</button>
		</div>
	</div>

	<!-- Upload PDF -->
	<div class="rounded-xl bg-[#2a2a3e] border border-white/10 p-6">
		<h2 class="text-lg font-semibold text-white mb-3">Upload PDF Problem</h2>
		<p class="text-sm text-slate-400 mb-4">Extract a problem from a PDF file.</p>

		<div class="space-y-4">
			<div>
				<label for="title" class="block text-sm font-medium text-slate-300 mb-1">Problem Title</label>
				<input
					id="title"
					bind:value={title}
					class="w-full bg-[#1e1e2e] border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
					placeholder="e.g., Functions and Return Values"
				/>
			</div>

			<div>
				<label for="difficulty" class="block text-sm font-medium text-slate-300 mb-1">Difficulty</label>
				<select
					id="difficulty"
					bind:value={difficulty}
					class="w-full bg-[#1e1e2e] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
				>
					<option value="beginner">Beginner</option>
					<option value="easy">Easy</option>
					<option value="medium">Medium</option>
					<option value="hard">Hard</option>
				</select>
			</div>

			<div>
				<label for="pdf" class="block text-sm font-medium text-slate-300 mb-1">PDF File</label>
				<input
					id="pdf"
					type="file"
					accept=".pdf"
					onchange={handleFileInput}
					class="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
				/>
			</div>

			<button
				onclick={uploadPdf}
				disabled={uploading || !title.trim() || !file}
				class="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
			>
				{uploading ? 'Uploading...' : 'Upload & Create Problem'}
			</button>
		</div>
	</div>
</div>
