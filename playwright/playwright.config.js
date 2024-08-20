const { defineConfig, devices } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: {
    timeout: 5000,
  },
  retries: 2,
  reporter: [['html', { open: 'never' }]],
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://qauto.forstudy.space',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
