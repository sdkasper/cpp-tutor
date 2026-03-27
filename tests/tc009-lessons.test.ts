import { test, expect } from '@playwright/test';
import { ensureStudent } from './helpers';

// TC-009: Interactive Lesson Viewer
test.describe('Interactive Lesson Viewer', () => {
	test.beforeEach(async ({ page }) => {
		await ensureStudent(page);
	});

	test('learn page shows lessons', async ({ page }) => {
		await page.goto('/learn');
		const lessonCards = page.locator('a[href^="/learn/"]');
		expect(await lessonCards.count()).toBeGreaterThanOrEqual(16);
	});

	test('lessons show estimated reading time', async ({ page }) => {
		await page.goto('/learn');
		const timeLabels = page.locator('text=/\\d+ min/');
		expect(await timeLabels.count()).toBeGreaterThan(0);
	});

	test('clicking a lesson opens content', async ({ page }) => {
		await page.goto('/learn');
		await page.locator('a[href^="/learn/"]').first().click();
		await page.waitForURL(/\/learn\//);
		const content = page.locator('h1, h2');
		await expect(content.first()).toBeVisible();
	});

	test('lessons have concept tags', async ({ page }) => {
		await page.goto('/learn');
		const tags = page.locator('.rounded-full');
		expect(await tags.count()).toBeGreaterThan(0);
	});
});
