import { test } from '../fixtures/modular.fixture.js'; // ✅ runner utama
import { readExcel } from '../utils/excelHelper.js';
import { allure } from 'allure-playwright';

const users = readExcel('registerData.xlsx', 'Sheet1');

for (const user of users) {
  test(`Register test for ${user.name}`, async ({ registerUser }) => {

    // 🔥 Allure metadata
    allure.feature('Register');
    allure.story('User registration from Excel');
    allure.severity('critical'); // minor / normal / critical / blocker

    // 👊 jalankan fixture
    await registerUser(user);
  });
}
