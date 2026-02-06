// @ts-check
import { defineConfig } from '@playwright/test';

const isHeadless = process.env.PLAYWRIGHT_HEADLESS !== '0'; // default headless=true di container

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['allure-playwright']
  ],

  use: {
    baseURL: 'https://automationexercise.com',
    trace: 'on-first-retry',

    // 🔥 dynamic browser config
    headless: isHeadless,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },

    screenshot: 'only-on-failure', // tetap ambil screenshot jika gagal
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { channel: 'chrome' },
    },
    {
      name: 'firefox',
      use: {
        channel: 'firefox',
        launchOptions: { args: ['--width=1920', '--height=1080'] },
      },
    },
    {
      name: 'webkit',
      use: { channel: 'webkit', viewport: { width: 1920, height: 1080 } },
    },
  ],
});
