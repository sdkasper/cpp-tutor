import { test, expect } from '@playwright/test';
import { ensureStudent } from './helpers';

// TC-006: Content Sync and Upload
test.describe('Content Sync and Upload', () => {
	test.beforeEach(async ({ page }) => {
		await ensureStudent(page);
	});

	test('problems are populated after sync', async ({ page }) => {
		await page.goto('/problems');
		const problems = page.locator('a[href^="/tutor/"]');
		expect(await problems.count()).toBeGreaterThanOrEqual(5);
	});

	test('admin page loads', async ({ page }) => {
		await page.goto('/admin');
		await page.waitForSelector('button, h1', { timeout: 5000 });
	});
});
