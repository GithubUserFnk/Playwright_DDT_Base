import { test } from '../../fixtures/modular.fixture.js';

test.describe('Full flow: Login + Fill Form', () => {

  test('Login tiap user dan isi form semua data', async ({ getAllUsers, loginUser, getAllFormData, fillFormData }) => {

    const users = getAllUsers;           // Ambil semua user dari fixture
    const formDatas = getAllFormData;    // Ambil semua form data dari fixture

    for (const user of users) {
      // 🔑 Login tiap user
      await loginUser(user);

      // Loop semua data form → isi form per user
      for (const data of formDatas) {
        await fillFormData(data);
      }

      // Optional: logout atau reset session sebelum user berikutnya
      // misal: await page.goto('/logout'); atau page.context().clearCookies();
    }

  });

});
