import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Locale = 'en' | 'ro';

const storedLocale = browser
	? (document.cookie.match(/(?:^|;\s*)locale=(\w+)/)?.[1] as Locale) ?? 'en'
	: 'en';

export const locale = writable<Locale>(storedLocale);

locale.subscribe((value) => {
	if (browser) {
		document.cookie = `locale=${value};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
	}
});

export function toggleLocale() {
	locale.update((l) => (l === 'en' ? 'ro' : 'en'));
}
