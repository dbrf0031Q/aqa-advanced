const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the login page
  await page.goto('https://qauto.forstudy.space/login');

  // Log in with a user account
  await page.fill('#email', 'user@example.com');  // Fill in your user email
  await page.fill('#password', 'password123');    // Fill in your user password
  await page.click('button[type="submit"]');

  // Wait for the navigation to the garage page
  await page.waitForURL('https://qauto.forstudy.space/garage');

  // Save storage state to a file
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
})();
