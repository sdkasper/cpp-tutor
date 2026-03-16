<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-[#1e1e2e]">
	<nav class="border-b border-white/10 bg-[#1e1e2e]/80 backdrop-blur-sm sticky top-0 z-50">
		<div class="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
			<a href="/" class="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
				&lt;C++ Tutor /&gt;
			</a>
			<div class="flex gap-4 text-sm">
				<a href="/problems" class="text-slate-400 hover:text-white transition-colors">Problems</a>
				<a href="/progress" class="text-slate-400 hover:text-white transition-colors">Progress</a>
				<a href="/admin" class="text-slate-400 hover:text-white transition-colors">Admin</a>
			</div>
		</div>
	</nav>

	{@render children()}
</div>
