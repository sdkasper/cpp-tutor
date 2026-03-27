<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { navigating } from '$app/stores';
	import { theme, toggleTheme } from '$lib/stores/theme';
	import { locale, toggleLocale } from '$lib/stores/locale';
	import { t } from '$lib/i18n';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	let { children } = $props();

	let mobileMenuOpen = $state(false);

	onMount(() => {
		// Apply stored theme on mount
		document.documentElement.setAttribute('data-theme', $theme);
	});

	function isActive(path: string): boolean {
		if (path === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(path);
	}

	function navClass(path: string): string {
		return isActive(path) ? 'text-white font-medium' : 'text-slate-400 hover:text-white';
	}
</script>

<svelte:head>
	<title>C++ Tutor</title>
</svelte:head>

{#if $navigating}
	<div class="nav-loading-bar"></div>
{/if}

<div class="min-h-screen" style="background: var(--color-surface);">
	<nav class="border-b sticky top-0 z-50 backdrop-blur-sm" style="border-color: var(--border-color); background: color-mix(in srgb, var(--color-surface) 80%, transparent);">
		<div class="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
			<div class="flex items-center gap-6">
				<a href="/" class="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
					&lt;C++ Tutor /&gt;
				</a>
				<div class="hidden sm:flex gap-4 text-sm">
					<a href="/learn" class="{navClass('/learn')} transition-colors">{$t('nav.learn')}</a>
					<a href="/problems" class="{navClass('/problems')} transition-colors">{$t('nav.problems')}</a>
					<a href="/progress" class="{navClass('/progress')} transition-colors">{$t('nav.progress')}</a>
					<a href="/admin" class="{navClass('/admin')} transition-colors">{$t('nav.admin')}</a>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<button
					onclick={() => { toggleLocale(); invalidateAll(); }}
					class="px-2 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
					aria-label="Toggle language"
				>
					{#if $locale === 'en'}
						<svg class="w-4 h-3 rounded-sm overflow-hidden" viewBox="0 0 640 480">
							<rect width="640" height="160" fill="#002B7F"/>
							<rect y="160" width="640" height="160" fill="#FCD116"/>
							<rect y="320" width="640" height="160" fill="#CE1126"/>
						</svg>
						RO
					{:else}
						<svg class="w-4 h-3 rounded-sm overflow-hidden" viewBox="0 0 640 480">
							<rect width="640" height="480" fill="#012169"/>
							<path d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" fill="#fff"/>
							<path d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" fill="#C8102E"/>
							<path d="M241 0v480h160V0H241zM0 160v160h640V160H0z" fill="#fff"/>
							<path d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" fill="#C8102E"/>
						</svg>
						EN
					{/if}
				</button>
				<button
					onclick={toggleTheme}
					class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
					aria-label={$t('nav.toggleTheme')}
				>
					{#if $theme === 'dark'}
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					{:else}
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
						</svg>
					{/if}
				</button>
				<!-- Mobile menu toggle -->
				<button
					onclick={() => mobileMenuOpen = !mobileMenuOpen}
					class="sm:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
					aria-label={$t('nav.toggleMenu')}
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if mobileMenuOpen}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						{:else}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						{/if}
					</svg>
				</button>
			</div>
		</div>
		{#if mobileMenuOpen}
			<div class="sm:hidden border-t px-4 py-2 flex flex-col gap-1" style="border-color: var(--border-color);">
				<a href="/learn" class="{navClass('/learn')} transition-colors py-2 text-sm" onclick={() => mobileMenuOpen = false}>{$t('nav.learn')}</a>
				<a href="/problems" class="{navClass('/problems')} transition-colors py-2 text-sm" onclick={() => mobileMenuOpen = false}>{$t('nav.problems')}</a>
				<a href="/progress" class="{navClass('/progress')} transition-colors py-2 text-sm" onclick={() => mobileMenuOpen = false}>{$t('nav.progress')}</a>
				<a href="/admin" class="{navClass('/admin')} transition-colors py-2 text-sm" onclick={() => mobileMenuOpen = false}>{$t('nav.admin')}</a>
			</div>
		{/if}
	</nav>

	{@render children()}
</div>
