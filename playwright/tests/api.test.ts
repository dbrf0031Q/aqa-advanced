const { test, expect } = require('@playwright/test');
test('Подмена ответа на странице профиля', async ({ page }) => {
  await page.route('**/api/profile', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1,
        name: 'testuser',
        email: 'testuser@example.com',
        phone: '123456789',
        address: 'testaddress'
      })
    });
  });

  await page.goto('https://qauto.forstudy.space/profile');
  const name = await page.locator('[data-test="name"]');
  await expect(name).toContainText('Тестовий Юзер');
});

const { test, request, expect} = require('@playwright/test');

test.describe('API тесты для создания машин', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: 'https://qauto.forstudy.space',
    });
  });

  test('Позитивный сценарий: успешное создание машины', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2022
      }
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
      success: true,
      message: 'Car created successfully'
    });
  });
});

test('Негативный сценарий: пустое тело запроса', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {}
    });
  
    expect(response.status()).toBe(400); // Проверяем, что статус код 400
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
      error: 'Invalid data'
    });
  });
  test('Негативный сценарий: неверный год выпуска', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        brand: 'Toyota',
        model: 'Corolla',
        year: 1800 // Неверный год
      }
    });
  
    expect(response.status()).toBe(400); // Проверяем, что статус код 400
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
      error: 'Invalid year'
    });
  });
    