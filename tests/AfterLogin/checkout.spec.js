import { test, expect } from '../../fixtures/modular.fixture.js';
import { allure } from 'allure-playwright';
import { allureStep, allureScreenshot } from '../../utils/allureHelper.js';

test.describe('Checkout Products', () => {

  test('Each user checkout from Excel', async ({
    getAllLoginUsers,
    loginUser,
    checkoutUser,
    getAllCheckoutData,
    attachInvoiceScreenshot
  }) => {

    for (const user of getAllLoginUsers) {
      allure.feature('Checkout');
      allure.story(`User ${user.email}`);
      allure.severity('Critical')

      // 🔥 LOGIN VIA STORAGE / UI
      const { page } = await loginUser(user);

      // 🔥 ADD TO CART VIA PAGE YANG SAMA
      const { checkoutPages } = await checkoutUser({ page, userEmail: user.email });

      for (const checkoutData of getAllCheckoutData) {

        await allureStep(`[${user.email}] Proceed Checkout`, async () => {
          await allureScreenshot(page, `${user.email} - Proceed Checkout`);
          await checkoutPages.clickProceed();
          await page.waitForTimeout(1000);
        });

        await allureStep('Isi Detail Checkout', async () => {
          await allureScreenshot(page, `${user.email} - Detail Checkout Before Comment`);
          await checkoutPages.fillComment(checkoutData.comment);
          await allureScreenshot(page, `${user.email} - Detail Checkout After Comment`);
          await checkoutPages.placeOrder();
        });

        await allureStep('Isi Detail Payment', async () => {
          await checkoutPages.fillPayment(
            checkoutData.nameOnCard,
            checkoutData.cardNumber,
            checkoutData.cvc,
            checkoutData.expirationMonth,
            checkoutData.expirationYear
          );

          await allureScreenshot(page, `${user.email} - Payment Info`);
          await checkoutPages.clickPay();
          await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
          await allureScreenshot(page, `${user.email} - After Payment`);
        });

        await allureStep('Download dan Screenshoot Invoice', async () => {
          // 🔹 Download invoice ke folder project "downloads"
          const filePath = await checkoutPages.downloadInvoice('downloads');

          // 🔹 Attach invoice screenshot ke Allure
          await attachInvoiceScreenshot({ filePath });
        });

        await allureStep('Continue Shopping', async () => {
          await checkoutPages.clickContinueShopping();
        });

      } // end checkoutData loop
    } // end getAllLoginUsers loop

  });

});
