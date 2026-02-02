// @ts-check
import { defineConfig } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // 🔥 ALLURE REPORTER
  reporter: [
    ['list'],
    ['allure-playwright']
  ],

  use: {
    baseURL: 'https://automationexercise.com',
    trace: 'on-first-retry',

    // 🔥 browser config
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },

    screenshot: 'off', // ❌ jangan pakai playwright screenshot
  },

  projects: [
    {
      name: 'chromium',
      use: {
        channel: 'chrome',
      },
    },
    {
      name: 'firefox',
      use: {
        channel: 'firefox',
        launchOptions: {
          args: ['--width=1920', '--height=1080'],
        },
      },
    },
    {
      name: 'webkit',
      use: {
        channel: 'webkit',
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});
