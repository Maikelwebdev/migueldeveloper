const { test, expect } = require('@playwright/test');

test.describe('Portfolio Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Vamos a la raíz. Si tu web detecta idioma, Playwright lo gestionará.
    await page.goto('/'); 
    // Esperamos a que el cuerpo de la página esté cargado
    await page.waitForLoadState('networkidle');
  });

  test('should have correct page title', async ({ page }) => {
    // Usamos una expresión regular para que no falle por un espacio o un guión de más
    await expect(page).toHaveTitle(/Miguel Ángel Martínez/);
  });

  test('should display Download CV button with correct link', async ({ page }) => {
    // Buscamos el botón por su rol de link y que contenga el texto (ignora mayúsculas)
    const downloadBtn = page.getByRole('link', { name: /Download Professional CV/i });
    
    await expect(downloadBtn).toBeVisible();
    
    // Verificamos que el href contenga la ruta al PDF (usamos una parte de la ruta por seguridad)
    const href = await downloadBtn.getAttribute('href');
    expect(href).toContain('CV%20MIGUEL%20ENG%20censor.pdf');
  });

  test('should be responsive on iPhone 13', async ({ page }) => {
    // Cambiamos el viewport manualmente para el test de responsive
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1000); // Damos tiempo a que el CSS se ajuste
    
    // Verificamos que el botón de CV siga siendo visible en móvil
    const downloadBtn = page.getByRole('link', { name: /Download Professional CV/i });
    await expect(downloadBtn).toBeVisible();
  });
});
