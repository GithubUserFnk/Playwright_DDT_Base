// @ts-check
import { defineConfig } from '@playwright/test';

// headless di CI / env, headed di local
const isHeadless = process.env.PLAYWRIGHT_HEADLESS === '1';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['allure-playwright'],
  ],

  use: {
    baseURL: 'https://automationexercise.com',
    trace: 'on-first-retry',

    // headless sesuai env
    headless: isHeadless,

    // headless ignore viewport, headed = maximize
    viewport: isHeadless ? undefined : null,

    launchOptions: {
      args: isHeadless
        ? [] // headless default
        : ['--start-maximized'], // headed Chromium maximize
    },

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        // Chromium internal Playwright, paling reliable fullscreen
        browserName: 'chromium',
        viewport: isHeadless ? undefined : null,
        launchOptions: {
          args: isHeadless ? [] : ['--start-maximized'],
        },
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 1920, height: 1080 }, // Firefox fullscreen OS tidak didukung
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        viewport: { width: 1920, height: 1080 }, // WebKit fullscreen OS tidak didukung
      },
    },
  ],
});
