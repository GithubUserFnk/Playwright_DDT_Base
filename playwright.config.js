// @ts-check
import { defineConfig } from '@playwright/test';

const isHeadless = process.env.PLAYWRIGHT_HEADLESS !== '0';

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
    headless: isHeadless,

    viewport: isHeadless ? { width: 1920, height: 1080 } : null,

    launchOptions: {
      args: isHeadless
        ? ['--window-size=1920,1080'] // headless fixed size
        : ['--start-fullscreen'],      // headed fullscreen Chromium
    },

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        channel: 'chrome',
        viewport: isHeadless ? { width: 1920, height: 1080 } : null,
        launchOptions: {
          args: isHeadless
            ? ['--window-size=1920,1080']
            : ['--start-fullscreen'], // Chromium fullscreen
        },
      },
    },
    {
      name: 'firefox',
      use: {
        channel: 'firefox',
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: isHeadless
            ? ['--width=1920', '--height=1080']
            : ['--width=1920', '--height=1080'],
        },
      },
    },
    {
      name: 'webkit',
      use: {
        channel: 'webkit',
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: isHeadless
            ? ['--width=1920', '--height=1080']
            : ['--width=1920', '--height=1080'],
        },
      },
    },
  ],
});
