// fixtures/register.fixture.js
import RegisterPage from '../pages/RegisterPage.js';
import { allureStep, allureScreenshot } from '../utils/allureHelper.js';
import { readExcel } from '../utils/excelHelper.js';
import { writeUserToExcel } from '../utils/writeToExcel.js';

// ✅ hanya object fixture, bukan test runner
export const registerFixtures = {
  registerUser: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);

    await use(async (userData) => {
      await allureStep('Buka halaman register', async () => {
        await registerPage.goto();
      });

      await allureStep('Klik menu register', async () => {
        await registerPage.clickMenuRegister();
        await page.waitForLoadState('domcontentloaded');
        await allureScreenshot(page, 'Menu register clicked');
      });

      await allureStep('Isi form register', async () => {
        await registerPage.fillName(userData.name);
        await registerPage.fillEmail(userData.email);
        await page.waitForLoadState('domcontentloaded');
        await allureScreenshot(page, 'Form filled');
      });

      await allureStep('Submit register', async () => {
        await registerPage.clickRegisterButton();
        await page.waitForLoadState('domcontentloaded');
        await allureScreenshot(page, 'After submit');
      });

      await allureStep('Fill Gender Until DOB', async () => {
        await registerPage.clickRadioButton(userData.gender);
        await registerPage.fillPassword(userData.password);
        await registerPage.chooseDob(userData.hari, userData.bulan, userData.tahun);
        await page.waitForLoadState('domcontentloaded');
        await allureScreenshot(page, 'After Fill Gender till DOB');
      });

      await allureStep('Fill Name Until State', async () => {
        await registerPage.fillNames(userData.firstName, userData.lastName);
        await registerPage.fillCompany(userData.company);
        await registerPage.fillAdress(userData.address);
        await registerPage.chooseCountry(userData.country);
        await registerPage.fillState(userData.state);
        await page.waitForLoadState('domcontentloaded');
        await allureScreenshot(page, 'After Fill till State');
      });

      await allureStep('Fill City Until Mobile Number', async () => {
        await registerPage.fillCity(userData.city);
        await registerPage.fillZipcode(userData.zipcode);
        await registerPage.fillMobileNumber(userData.mobileNumber);
        await page.waitForLoadState('domcontentloaded');
        await allureScreenshot(page, 'After Fill till Mobile Number');
        await registerPage.clickCreateAccount();
      });

      await allureStep('Verify Register and Continue', async () => {
        await registerPage.verifyAccountCreated.waitFor({ state: 'visible' });
        await page.waitForLoadState('domcontentloaded');
        await allureScreenshot(page, 'Verify Register');
        await registerPage.clickContinue();
        // await writeUserToExcel(userData, 'data/loginData.xlsx', ['email', 'password']);
        await page.waitForLoadState('domcontentloaded');
        await allureScreenshot(page, 'After Click Continue Button');
      });
    });
  },

  getAllUsers: async ({}, use) => {
    const users = readExcel('registerData.xlsx', 'Sheet1');
    await use(users);
  },
};
