import { test, expect } from '@playwright/test';
import { ensureStudent } from './helpers';

// TC-007: Progress Dashboard
test.describe('Progress Dashboard', () => {
	test.beforeEach(async ({ page }) => {
		await ensureStudent(page);
	});

	test('progress page loads with stat cards', async ({ page }) => {
		await page.goto('/progress');
		// 3 stat cards: solved, in progress, total
		const statCards = page.locator('.card.p-5.text-center');
		expect(await statCards.count()).toBe(3);
	});

	test('progress bar exists', async ({ page }) => {
		await page.goto('/progress');
		// Bar may have width:0% for new students (hidden), but element should exist
		const progressBar = page.locator('.progress-bar-animate');
		await expect(progressBar).toBeAttached();
	});
});
