// tests/login.spec.js
import { test, expect } from '../fixtures/modular.fixture.js';
import { allure } from 'allure-playwright';

test.describe('Login Multi-User with StorageState', () => {
  test('All login users can login successfully', async ({ getAllLoginUsers, loginUser }) => {
    for (const user of getAllLoginUsers) {
      allure.feature('Login');
      allure.story('Login from Excel');
      allure.severity('critical');

      // ⚡ Pastikan pakai await
      const { page, context } = await loginUser(user);

      // optional: tutup context tiap user biar bersih
      await context.close();
    }
  });
});
