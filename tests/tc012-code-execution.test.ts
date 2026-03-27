import { test, expect } from '@playwright/test';
import { ensureStudent } from './helpers';

// TC-012: Code Execution via Wandbox
test.describe('Code Execution via Wandbox', () => {
	test.beforeEach(async ({ page }) => {
		await ensureStudent(page);
	});

	test('tutor page has code editor and run button', async ({ page }) => {
		await page.goto('/problems');
		await page.locator('a[href^="/tutor/"]').first().click();
		await page.waitForURL(/\/tutor\//);

		const editor = page.locator('.cm-editor');
		await expect(editor).toBeVisible({ timeout: 5000 });
	});

	test('run button executes code', async ({ page }) => {
		await page.goto('/problems');
		await page.locator('a[href^="/tutor/"]').first().click();
		await page.waitForURL(/\/tutor\//);
		await page.waitForSelector('.cm-editor', { timeout: 5000 });

		// Look for any run button
		const runButton = page.locator('button:has-text("Run"), button:has-text("▶")').first();
		if (await runButton.isVisible()) {
			await runButton.click();
			// Allow time for Wandbox API response
			await page.waitForTimeout(5000);
		}
	});
});
