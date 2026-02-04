import { test } from '../fixtures/modular.fixture.js';
import { allure } from 'allure-playwright';
import { allureStep, allureScreenshot } from '../utils/allureHelper.js';

test.describe('Add To Cart - Multi User (Storage)', () => {

  test('Each user add products from Excel', async ({
    getAllLoginUsers,
    loginUser,
    addToCartUser,
    getAllCartProducts
  }) => {

    for (const user of getAllLoginUsers) {
      allure.feature('Add To Cart');
      allure.story(`User ${user.email}`);

      // 🔥 LOGIN VIA STORAGE / UI
      const { page } = await loginUser(user);

      // 🔥 ADD TO CART VIA PAGE YANG SAMA
      const { addToCartPages } = await addToCartUser({ page, userEmail: user.email });

      for (const product of getAllCartProducts) {
        await allureStep(
          `[${user.email}] Add product: ${product.productName}`,
          async () => {
            await addToCartPages.fillSearch(product.productName);

            // optional: jeda 1s biar animasi/overlay kelar
            await page.waitForTimeout(1000);

            await addToCartPages.clickAddtoCart();

            // optional: jeda 1s sebelum next step
            await page.waitForTimeout(1000);

            await allureScreenshot(page, `${user.email} add ${product.productName}`);
            await addToCartPages.clearSearchField();
          }
        );
      }
    }

  });

});
