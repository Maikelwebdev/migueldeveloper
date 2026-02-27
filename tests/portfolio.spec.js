import { test, expect } from '@playwright/test';

test.describe('Portfolio Tests', () => {
  const baseURL = 'http://localhost:4321';

  test('should have correct page title (ES)', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page).toHaveTitle(/Miguel Ángel Martínez/);
  });

  test('should have correct page title (EN)', async ({ page }) => {
    await page.goto(`${baseURL}/en`);
    await expect(page).toHaveTitle(/Miguel Ángel Martínez/);
  });

  test('should display Download Professional CV button with correct link (ES)', async ({ page }) => {
    await page.goto(baseURL);
    const cvButton = page.getByRole('link', { name: /Download Professional CV/i });
    await expect(cvButton).toBeVisible();
    await expect(cvButton).toHaveAttribute('href', /\/assets\/CV%20MIGUEL%20ENG%20censor\.pdf/);
  });

  test('should display Download Professional CV button with correct link (EN)', async ({ page }) => {
    await page.goto(`${baseURL}/en`);
    const cvButton = page.getByRole('link', { name: /Download Professional CV/i });
    await expect(cvButton).toBeVisible();
    await expect(cvButton).toHaveAttribute('href', /\/assets\/CV%20MIGUEL%20ENG%20censor\.pdf/);
  });

  test('should be responsive on iPhone 13 (ES)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseURL);
    
    // Verify page loads without breaking
    await expect(page.locator('body')).toBeVisible();
    
    // Verify navbar is visible
    await expect(page.locator('.navbar')).toBeVisible();
  });

  test('should be responsive on iPhone 13 (EN)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseURL}/en`);
    
    // Verify page loads without breaking
    await expect(page.locator('body')).toBeVisible();
    
    // Verify navbar is visible
    await expect(page.locator('.navbar')).toBeVisible();
  });
});
