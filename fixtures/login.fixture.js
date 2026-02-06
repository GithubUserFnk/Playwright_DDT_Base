// fixtures/login.fixture.js
import LoginPage from '../pages/LoginPages.js';
import { allureStep, allureScreenshot } from '../utils/allureHelper.js';
import { readExcel } from '../utils/excelHelper.js';
import fs from 'fs';
import path from 'path';

export const loginFixtures = {
  // Fixture loginUser siap dipakai di test
  loginUser: async ({ page }, use) => { // ambil page default dari test runner
    await use(async (userData) => {
      const storageDir = path.resolve('storage');
      if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir);

      const storagePath = path.join(storageDir, `${userData.email}.json`);
      const loginPage = new LoginPage(page);

      // Cek storageState, load kalau ada
      if (fs.existsSync(storagePath)) {
        await page.context().addCookies(
          JSON.parse(fs.readFileSync(storagePath, 'utf-8')).cookies || []
        );
        await page.goto('/', { waitUntil: 'domcontentloaded' });
      } else {
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

        // Simpan storageState dari context page default
        await page.context().storageState({ path: storagePath });
      }

      return { page }; // cukup return page, context sudah ada di runner
    });
  },

  // Fixture untuk ambil semua user dari Excel
  getAllLoginUsers: async ({}, use) => {
    const users = readExcel('loginData.xlsx', 'Sheet1');
    await use(users);
  },
};
