import { test, expect } from '@playwright/test';

test.describe('Constructor page', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });
    await page.context().addCookies([
      {
        name: 'accessToken',
        value: 'fake-token',
        domain: 'localhost',
        path: '/',
      },
    ]);
    await page.context().addInitScript(() => {
      localStorage.setItem('refreshToken', 'fake-refresh-token');
    });
  });

  test('should add ingredient to constructor', async ({ page }) => {
    await page.goto('http://localhost:4000');
    await page.waitForSelector('[data-testid="ingredient-card"]', { timeout: 5000 });
    await page.locator('[data-testid="add-button"]').first().click();
    await expect(page.locator('[data-testid="constructor-element"]')).toHaveCount(1);
  });

  test('should open and close ingredient modal', async ({ page }) => {
    await page.goto('http://localhost:4000');
    await page.waitForSelector('[data-testid="ingredient-card"]', { timeout: 5000 });
    await page.locator('[data-testid="ingredient-card"]').first().click();
    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    await page.locator('[data-testid="modal-close"]').click();
    await expect(page.locator('[data-testid="modal"]')).toBeHidden();
  });

  test('should create order', async ({ page }) => {
    await page.routeFromHAR('./tests/hars/order.har', {
      url: '**/api/orders',
      update: false,
    });

    await page.goto('http://localhost:4000');
    await page.waitForSelector('[data-testid="ingredient-card"]', { timeout: 5000 });

    await page.locator('[data-testid="add-button"]').first().click();
    await page.locator('[data-testid="add-button"]').nth(1).click();

    await page.locator('[data-testid="order-button"]').click();

    await expect(page.locator('[data-testid="modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="order-number"]')).toHaveText(/\d+/);

    await page.locator('[data-testid="modal-close"]').click();

    await expect(page.locator('[data-testid="constructor-element"]')).toHaveCount(0);
  });
});
