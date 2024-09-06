const { test, expect } = require('@playwright/test');

const baseURL = 'https://qauto.forstudy.space/';
const adminCredentials = {
  email: 'guest',
  password: 'welcome2qauto',
};

test.beforeEach(async ({ page }) => {
  // Авторизація перед кожним тестом
  await page.goto(baseURL);

  // Перевірка, чи є на сторінці форма логіну
  if (await page.locator('text=Login').isVisible()) {
    await page.click('text=Login');
    await page.fill('input[name="email"]', adminCredentials.email);
    await page.fill('input[name="password"]', adminCredentials.password);
    await page.click('button[type="submit"]'); // Кнопка для відправлення форми
  }

  // Перевірка, чи вдалося увійти в систему
  await expect(page.locator('text=Dashboard')).toBeVisible();
});

test('Позитивний сценарій: успішна реєстрація користувача', async ({ page }) => {
  await page.goto(`${baseURL}/register`); // Перехід на сторінку реєстрації

  const uniqueEmail = `john.doe-${Date.now()}@example.com`;
  await page.fill('input[name="name"]', 'John');
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="email"]', uniqueEmail);
  await page.fill('input[name="password"]', 'Password123', { sensitive: true });
  await page.fill('input[name="confirmPassword"]', 'Password123', { sensitive: true });

  const isRegisterButtonEnabled = await page.isEnabled('button[type="submit"]');
  expect(isRegisterButtonEnabled).toBeTruthy();

  await page.click('button[type="submit"]'); // Кнопка для реєстрації
  await expect(page.locator('text=Registration successful')).toBeVisible();
});

test('Negative Test: All fields are empty', async ({ page }) => {
  await page.goto(`${baseURL}/register`);
  await page.click('button[type="submit"]');

  await expect(page.locator('#name-error')).toHaveText('Name is required');
  await expect(page.locator('#lastname-error')).toHaveText('Last name is required');
  await expect(page.locator('#email-error')).toHaveText('Email required');
  await expect(page.locator('#password-error')).toHaveText('Password required');
  await expect(page.locator('#confirmPassword-error')).toHaveText('Re-enter password required');
});

test('Negative Test: Invalid Email', async ({ page }) => {
  await page.goto(`${baseURL}/register`);
  await page.fill('input[name="email"]', 'invalidemail');
  await page.click('button[type="submit"]');
  await expect(page.locator('#email-error')).toHaveText('Email is incorrect');
});

test('Negative Test: Short Name', async ({ page }) => {
  await page.goto(`${baseURL}/register`);
  await page.fill('input[name="name"]', 'J');
  await page.click('button[type="submit"]');
  await expect(page.locator('#name-error')).toHaveText('Name has to be from 2 to 20 characters long');
});

test('Negative Test: Passwords Do Not Match', async ({ page }) => {
  await page.goto(`${baseURL}/register`);
  await page.fill('input[name="password"]', 'Password123', { sensitive: true });
  await page.fill('input[name="confirmPassword"]', 'Password456', { sensitive: true });
  await page.click('button[type="submit"]');
  await expect(page.locator('#confirmPassword-error')).toHaveText('Passwords do not match');
});
