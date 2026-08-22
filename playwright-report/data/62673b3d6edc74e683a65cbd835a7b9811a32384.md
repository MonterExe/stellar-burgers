# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: constructor.spec.tsx >> Constructor page >> should add ingredient to constructor
- Location: tests\constructor.spec.tsx:22:7

# Error details

```
TimeoutError: page.waitForSelector: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[data-testid="ingredient-card"]') to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - navigation [ref=e5]:
      - generic [ref=e6]:
        - link [ref=e7] [cursor=pointer]:
          - /url: /
          - paragraph [ref=e10]: Конструктор
        - link [ref=e11] [cursor=pointer]:
          - /url: /feed
          - paragraph [ref=e14]: Лента заказов
      - link [ref=e84] [cursor=pointer]:
        - /url: /profile
        - paragraph [ref=e87]: Личный кабинет
  - generic [ref=e88]: "Failed to execute 'json' on 'Response': Unexpected end of JSON input"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Constructor page', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.routeFromHAR('./tests/hars/ingredients.har', {
  6  |       url: '**/api/ingredients',
  7  |       update: false,
  8  |     });
  9  |     await page.context().addCookies([
  10 |       {
  11 |         name: 'accessToken',
  12 |         value: 'fake-token',
  13 |         domain: 'localhost',
  14 |         path: '/',
  15 |       },
  16 |     ]);
  17 |     await page.context().addInitScript(() => {
  18 |       localStorage.setItem('refreshToken', 'fake-refresh-token');
  19 |     });
  20 |   });
  21 | 
  22 |   test('should add ingredient to constructor', async ({ page }) => {
  23 |     await page.goto('http://localhost:4000');
> 24 |     await page.waitForSelector('[data-testid="ingredient-card"]', { timeout: 5000 });
     |                ^ TimeoutError: page.waitForSelector: Timeout 5000ms exceeded.
  25 |     await page.locator('[data-testid="add-button"]').first().click();
  26 |     await expect(page.locator('[data-testid="constructor-element"]')).toHaveCount(1);
  27 |   });
  28 | 
  29 |   test('should open and close ingredient modal', async ({ page }) => {
  30 |     await page.goto('http://localhost:4000');
  31 |     await page.waitForSelector('[data-testid="ingredient-card"]', { timeout: 5000 });
  32 |     await page.locator('[data-testid="ingredient-card"]').first().click();
  33 |     await expect(page.locator('[data-testid="modal"]')).toBeVisible();
  34 |     await page.locator('[data-testid="modal-close"]').click();
  35 |     await expect(page.locator('[data-testid="modal"]')).toBeHidden();
  36 |   });
  37 | 
  38 |   test('should create order', async ({ page }) => {
  39 |     await page.routeFromHAR('./tests/hars/order.har', {
  40 |       url: '**/api/orders',
  41 |       update: false,
  42 |     });
  43 | 
  44 |     await page.goto('http://localhost:4000');
  45 |     await page.waitForSelector('[data-testid="ingredient-card"]', { timeout: 5000 });
  46 | 
  47 |     await page.locator('[data-testid="add-button"]').first().click();
  48 |     await page.locator('[data-testid="add-button"]').nth(1).click();
  49 | 
  50 |     await page.locator('[data-testid="order-button"]').click();
  51 | 
  52 |     await expect(page.locator('[data-testid="modal"]')).toBeVisible();
  53 |     await expect(page.locator('[data-testid="order-number"]')).toHaveText(/\d+/);
  54 | 
  55 |     await page.locator('[data-testid="modal-close"]').click();
  56 | 
  57 |     await expect(page.locator('[data-testid="constructor-element"]')).toHaveCount(0);
  58 |   });
  59 | });
  60 | 
```