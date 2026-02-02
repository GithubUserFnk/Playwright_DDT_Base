// fixtures/login.fixture.js
import { test as base, expect } from './fullwindow.fixture.js';
import LoginPage from '../pages/LoginPages.js';
import { allureStep, allureScreenshot } from '../utils/allureHelper.js';
import { readExcel } from '../utils/excelHelper.js';
import fs from 'fs';
import path from 'path';

export const loginFixtures = {
  // Fixture loginUser siap dipakai di test
  loginUser: async ({ browser }, use) => {
    await use(async (userData) => {
      const storageDir = path.resolve('storage');
      if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir);

      const storagePath = path.join(storageDir, `${userData.email}.json`);

      let context;

      if (fs.existsSync(storagePath)) {
        // Reuse storageState
        context = await browser.newContext({ storageState: storagePath });
      } else {
        context = await browser.newContext();
      }

      const page = await context.newPage();
      const loginPage = new LoginPage(page);

      if (!fs.existsSync(storagePath)) {
        await allureStep('Buka halaman login', async () => {
          await loginPage.goto();
        });

        await allureStep(`Isi kredensial: ${userData.email}`, async () => {
          await loginPage.fillLogin(userData.email, userData.password);
          await page.waitForLoadState('domcontentloaded');
          await allureScreenshot(page, `Form login diisi: ${userData.email}`);
        });

        await allureStep('Klik tombol login', async () => {
          await loginPage.clickLogin();
          await page.waitForLoadState('domcontentloaded');
          await allureScreenshot(page, `Login berhasil: ${userData.email}`);
        });

        // Simpan storageState
        await context.storageState({ path: storagePath });
      } else {
        // navigasi ke home biar page siap
        await page.goto('/', { waitUntil: 'domcontentloaded' });
      }

      // **Return page & context biar test runner aware**
      return { page, context };
    });
  },

  getAllLoginUsers: async ({}, use) => {
    const users = readExcel('loginData.xlsx', 'Sheet1');
    await use(users);
  },
};

export { expect };
