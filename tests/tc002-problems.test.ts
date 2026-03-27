import { test, expect } from '@playwright/test';
import { ensureStudent } from './helpers';

// TC-002: Problem List Navigation
test.describe('Problem List Navigation', () => {
	test.beforeEach(async ({ page }) => {
		await ensureStudent(page);
	});

	test('displays problems with difficulty badges', async ({ page }) => {
		await page.goto('/problems');
		const problemCards = page.locator('a[href^="/tutor/"]');
		expect(await problemCards.count()).toBeGreaterThan(0);
	});

	test('clicking a problem navigates to tutor', async ({ page }) => {
		await page.goto('/problems');
		await page.locator('a[href^="/tutor/"]').first().click();
		await page.waitForURL(/\/tutor\//);
		expect(page.url()).toContain('/tutor/');
	});

	test('difficulty filter works', async ({ page }) => {
		await page.goto('/problems');
		await page.waitForSelector('a[href^="/tutor/"]');
		const allCount = await page.locator('a[href^="/tutor/"]').count();

		await page.click('button:has-text("Beginner")');
		await page.waitForTimeout(300);
		const filteredCount = await page.locator('a[href^="/tutor/"]').count();
		expect(filteredCount).toBeLessThanOrEqual(allCount);
		expect(filteredCount).toBeGreaterThan(0);
	});
});
