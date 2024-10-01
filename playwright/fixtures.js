const { chromium, defineConfig } = require('@playwright/test');

exports.userGaragePage = async ({}, use) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    storageState: 'storageState.json',  // Load the saved storage state
  });

  const page = await context.newPage();
  await page.goto('https://qauto.forstudy.space/garage');  // Directly go to the Garage page

  await use(page);

  await browser.close();
};
