import { type Page } from '@playwright/test';

/**
 * Ensure a student is logged in. Creates one via API if needed.
 * Returns the student name.
 */
export async function ensureStudent(page: Page): Promise<string> {
	const name = `E2E_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

	// Create student via API
	const response = await page.request.post('/api/students', {
		data: { name }
	});

	if (!response.ok()) {
		// May already have a student from cookie — try selecting problems page
		await page.goto('/problems');
		try {
			await page.waitForSelector('a[href^="/tutor/"]', { timeout: 5000 });
			return name;
		} catch {
			throw new Error(`Failed to create student: ${await response.text()}`);
		}
	}

	// Navigate to problems to confirm login
	await page.goto('/problems');
	await page.waitForSelector('a[href^="/tutor/"], .card', { timeout: 10000 });
	return name;
}
