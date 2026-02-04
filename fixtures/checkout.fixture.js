import { expect } from './fullwindow.fixture.js';
import CheckoutPage from '../pages/CheckoutPages.js';
import { allureStep } from '../utils/allureHelper.js';
import { readExcel } from '../utils/excelHelper.js';

export const CheckoutFixtures = {

  checkoutUser: async ({}, use) => {
    await use(async ({ page, userEmail }) => {
      const checkoutPages = new CheckoutPage(page);

      await allureStep(`[${userEmail}] Open checkout page`, async () => {
        await checkoutPages.goto()
      });

      // return page & addToCartPages
      return { page, checkoutPages };
    });
  },

  getAllCheckoutData: async ({}, use) => {
    const products = readExcel('checkout.xlsx', 'Sheet1');
    await use(products);
  },
};

export { expect };
