const { test } = require('@playwright/test');
const { userGaragePage } = require('./fixtures');

test.describe.configure({ mode: 'serial' }); 

test.use({ userGaragePage }); 

test('should load garage page with logged in user', async ({ userGaragePage }) => {
  await userGaragePage.waitForSelector('.garage-title');
  const garageTitle = await userGaragePage.locator('.garage-title').textContent();
  expect(garageTitle).toBe('My Garage');
  await userGaragePage.click('button.add-car'); 
});
