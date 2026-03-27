import { test, expect } from '@playwright/test';
import { ensureStudent } from './helpers';

// TC-010: Language Switching
test.describe('Language Switching', () => {
	test.beforeEach(async ({ page }) => {
		await ensureStudent(page);
		// Set locale to English
		await page.context().addCookies([{
			name: 'locale',
			value: 'en',
			url: 'http://localhost:5173'
		}]);
	});

	test('default shows EN with GB flag', async ({ page }) => {
		await page.goto('/problems');
		const langButton = page.locator('button[aria-label="Toggle language"]');
		await expect(langButton).toContainText('EN');
		await expect(page.locator('h2:has-text("Hello, World!")')).toBeVisible();
	});

	test('toggle switches to Romanian content', async ({ page }) => {
		await page.goto('/problems');
		await page.locator('button[aria-label="Toggle language"]').click();
		await page.waitForTimeout(1500);
		await expect(page.locator('h2:has-text("Salut, Lume!")')).toBeVisible({ timeout: 5000 });
	});

	test('toggle switches lessons to Romanian', async ({ page }) => {
		await page.goto('/learn');
		await page.locator('button[aria-label="Toggle language"]').click();
		await page.waitForTimeout(1500);
		const lessons = page.locator('a[href^="/learn/"]');
		expect(await lessons.count()).toBeGreaterThanOrEqual(16);
	});

	test('locale cookie persists', async ({ page, context }) => {
		await page.goto('/problems');
		await page.locator('button[aria-label="Toggle language"]').click();
		await page.waitForTimeout(500);

		const cookies = await context.cookies();
		const localeCookie = cookies.find(c => c.name === 'locale');
		expect(localeCookie?.value).toBe('ro');
	});

	test('toggle back to English works', async ({ page }) => {
		await page.goto('/problems');
		const langButton = page.locator('button[aria-label="Toggle language"]');

		// To RO
		await langButton.click();
		await page.waitForTimeout(1500);
		await expect(langButton).toContainText('RO');

		// Back to EN
		await langButton.click();
		await page.waitForTimeout(1500);
		await expect(langButton).toContainText('EN');
		await expect(page.locator('h2:has-text("Hello, World!")')).toBeVisible({ timeout: 5000 });
	});
});
