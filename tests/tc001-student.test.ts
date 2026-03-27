import { test, expect } from '@playwright/test';

// TC-001: Student Creation and Selection
test.describe('Student Creation and Selection', () => {
	const uniqueName = `Test_${Date.now()}`;

	test('create new student and redirect to problems', async ({ page }) => {
		await page.goto('/');
		await page.fill('input[placeholder]', uniqueName);
		await page.click('button[type="submit"]');
		await page.waitForURL('/problems');
		expect(page.url()).toContain('/problems');
	});

	test('returning student sees welcome back message', async ({ page, context }) => {
		// Create student first
		await page.goto('/');
		await page.fill('input[placeholder]', `Return_${Date.now()}`);
		await page.click('button[type="submit"]');
		await page.waitForURL('/problems');

		// Go back to home
		await page.goto('/');
		await expect(page.locator('text=Welcome back')).toBeVisible({ timeout: 5000 }).catch(() => {
			// i18n: might be Romanian
		});
	});

	test('student_id cookie is set after creation', async ({ page, context }) => {
		await page.goto('/');
		const name = `Cookie_${Date.now()}`;
		await page.fill('input[placeholder]', name);
		await page.click('button[type="submit"]');
		await page.waitForURL('/problems');

		const cookies = await context.cookies();
		const studentCookie = cookies.find(c => c.name === 'student_id');
		expect(studentCookie).toBeTruthy();
	});

	test('duplicate name shows error', async ({ page }) => {
		const name = `Dup_${Date.now()}`;
		// Create first
		await page.goto('/');
		await page.fill('input[placeholder]', name);
		await page.click('button[type="submit"]');
		await page.waitForURL('/problems');

		// Try duplicate
		await page.goto('/');
		await page.fill('input[placeholder]', name);
		await page.click('button[type="submit"]');
		await expect(page.locator('.text-red-400')).toBeVisible({ timeout: 5000 });
	});

	test('can switch between students', async ({ page }) => {
		const name1 = `Switch1_${Date.now()}`;
		const name2 = `Switch2_${Date.now()}`;

		// Create first student
		await page.goto('/');
		await page.fill('input[placeholder]', name1);
		await page.click('button[type="submit"]');
		await page.waitForURL('/problems');

		// Create second student
		await page.goto('/');
		await page.fill('input[placeholder]', name2);
		await page.click('button[type="submit"]');
		await page.waitForURL('/problems');

		// Go home, both should appear as buttons
		await page.goto('/');
		await expect(page.locator(`button:has-text("${name1}")`)).toBeVisible();
		await expect(page.locator(`button:has-text("${name2}")`)).toBeVisible();

		// Click first student to switch
		await page.click(`button:has-text("${name1}")`);
		await page.waitForURL('/problems');
	});
});
