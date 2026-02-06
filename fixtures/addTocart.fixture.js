// fixtures/addToCart.fixture.js
import AddtoCartPages from '../pages/AddtoCartPages.js';
import { allureStep } from '../utils/allureHelper.js';
import { readExcel } from '../utils/excelHelper.js';

export const addToCartFixtures = {

  addToCartUser: async ({ page }, use) => {
    const addToCartPages = new AddtoCartPages(page);

    await use(async ({ userEmail }) => {
      await allureStep(`[${userEmail}] Open product page`, async () => {
        await addToCartPages.goto();
      });

      // return page & addToCartPages supaya test bisa pakai
      return { page, addToCartPages };
    });
  },

  getAllCartProducts: async ({}, use) => {
    const products = readExcel('addToCartData.xlsx', 'Sheet1');
    await use(products);
  },
};
