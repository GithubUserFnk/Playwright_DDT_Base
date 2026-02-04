import { test } from '../fixtures/modular.fixture.js';
import { allure, expect } from 'allure-playwright';
import { allureStep, allureScreenshot } from '../utils/allureHelper.js';

test.describe('Checkout Products', () => {

  test('Each user checkout from Excel', async ({
    getAllLoginUsers,
    loginUser,
    checkoutUser,
    getAllCheckoutData
  }) => {

    for (const user of getAllLoginUsers) {
      allure.feature('Checkout');
      allure.story(`User ${user.email}`);

      // 🔥 LOGIN VIA STORAGE / UI
      const { page } = await loginUser(user);

      // 🔥 ADD TO CART VIA PAGE YANG SAMA
      const { checkoutPages } = await checkoutUser({ page, userEmail: user.email });

      for (const checkoutData of getAllCheckoutData) {
        await allureStep(
          `[${user.email}] Proceed Checkout}`,
          async () => {
            await allureScreenshot(page, `${user.email} proceed Checkout`);
            await checkoutPages.clickProceed()
            await page.waitForTimeout(1000)
          }
        )

        await allureStep('Isi Detail Checkout', async () => {
            await allureScreenshot(page, `${user.email} Screenshoot Detail Checkout`);
            await checkoutPages.fillComment(checkoutData.comment)
            await allureScreenshot(page, `${user.email} Screenshoot Detail Checkout`);
            await checkoutPages.placeOrder()
        })

        await allureStep('Isi Detail Payment', async () => {
            await checkoutPages.fillPayment(checkoutData.nameOnCard, checkoutData.cardNumber, checkoutData.cvc, checkoutData.expirationMonth, checkoutData.expirationYear)
            await allureScreenshot(page, `${user.email} Screenshoot Payment`);
            await checkoutPages.clickPay();
            await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
            await allureScreenshot(page, `${user.email} Screenshoot After Payment`);
            await checkoutPages.clickContinueShopping()
        })
      }
    }

  });

});
