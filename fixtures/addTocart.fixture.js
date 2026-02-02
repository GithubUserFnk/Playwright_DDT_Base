// fixtures/addtocart.fixture.js
import { test as base, expect } from './fullwindow.fixture.js';
import AddtoCartPages from '../pages/AddtoCartPages.js';
import { allureStep } from '../utils/allureHelper.js';
import { readExcel } from '../utils/excelHelper.js';

export const addToCartFixtures = {

  addToCartUser: async ({}, use) => {
    await use(async ({ page, userEmail }) => {
      const addToCartPages = new AddtoCartPages(page);

      await allureStep(`[${userEmail}] Open product page`, async () => {
        await addToCartPages.goto();
      });

      // return page & addToCartPages
      return { page, addToCartPages };
    });
  },

  getAllCartProducts: async ({}, use) => {
    const products = readExcel('addToCartData.xlsx', 'Sheet1');
    await use(products);
  },
};

export { expect };
