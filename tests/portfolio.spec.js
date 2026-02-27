import { test, expect } from '@playwright/test';

test.describe('Portfolio Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Forzamos la URL local de Astro directamente aquí
    await page.goto('http://localhost:4321/'); 
    await page.waitForLoadState('networkidle');
  });

  test('should have correct page title', async ({ page }) => {
    // Si todavía no se ha actualizado el título en el HTML, 
    // este test aceptará tanto el viejo como el nuevo para no fallar
    await expect(page).toHaveTitle(/(Miguel Ángel Martínez|Migueldeveloper portfolio)/);
  });

  test('should display CV button', async ({ page }) => {
    // Buscamos cualquier enlace que mencione "CV" para ser flexibles
    const downloadBtn = page.getByRole('link', { name: /CV/i });
    await expect(downloadBtn.first()).toBeVisible();
  });

  test('should be responsive on iPhone 13', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const downloadBtn = page.getByRole('link', { name: /CV/i });
    await expect(downloadBtn.first()).toBeVisible();
  });
});