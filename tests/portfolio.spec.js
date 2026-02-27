import { test, expect } from '@playwright/test';

test.describe('Portfolio Tests', () => {
  const baseURL = 'http://localhost:4321';

  test('should have correct page title (ES)', async ({ page }) => {
    await page.goto(baseURL);
    await expect(page).toHaveTitle(/Miguel Ángel Martínez \| Full Stack Developer & IT Solutions/);
  });

  test('should have correct page title (EN)', async ({ page }) => {
    await page.goto(`${baseURL}/en`);
    await expect(page).toHaveTitle(/Miguel Ángel Martínez \| Full Stack Developer & IT Solutions/);
  });

  test('should display Ver CV button with correct link (ES)', async ({ page }) => {
    await page.goto(baseURL);
    const cvButton = page.locator('a[href="#resume"]').first();
    await expect(cvButton).toBeVisible();
    await expect(cvButton).toContainText('Ver CV');
  });

  test('should display Resume button with correct link (EN)', async ({ page }) => {
    await page.goto(`${baseURL}/en`);
    const cvButton = page.locator('a[href="#resume"]').first();
    await expect(cvButton).toBeVisible();
    await expect(cvButton).toContainText('Resume');
  });

  test('should be responsive on iPhone 13 (ES)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(baseURL);
    
    // Check page loads without errors
    await expect(page.locator('#home')).toBeVisible();
    
    // Check navbar elements are accessible
    await expect(page.locator('.navbar')).toBeVisible();
  });

  test('should be responsive on iPhone 13 (EN)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseURL}/en`);
    
    // Check page loads without errors
    await expect(page.locator('#home')).toBeVisible();
    
    // Check navbar elements are accessible
    await expect(page.locator('.navbar')).toBeVisible();
  });
});
