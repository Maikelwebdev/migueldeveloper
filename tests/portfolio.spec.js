import { test, expect } from '@playwright/test';

test.describe('Portfolio Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); 
    await page.waitForLoadState('networkidle');
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Migueldeveloper/);
  });

  test('should display Ver CV button with correct link', async ({ page }) => {
    const cvButton = page.getByRole('link', { name: /Ver CV/i });
    
    await expect(cvButton).toBeVisible();
    
    const href = await cvButton.getAttribute('href');
    expect(href).toContain('#resume');
  });

  test('should display Download CV button in resume section', async ({ page }) => {
    const downloadButton = page.locator('a[href*="CV%20MIGUEL%20ENG"]');
    
    await expect(downloadButton).toBeVisible();
  });

  test('should be responsive on iPhone 13', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1000);
    
    await expect(page.locator('.navbar')).toBeVisible();
  });
});
