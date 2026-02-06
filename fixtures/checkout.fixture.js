// fixtures/checkout.fixture.js
import fs from 'fs';
import { allure } from 'allure-playwright';
import CheckoutPage from '../pages/CheckoutPages.js';
import { allureStep } from '../utils/allureHelper.js';
import { readExcel } from '../utils/excelHelper.js';

export const CheckoutFixtures = {

  checkoutUser: async ({ page }, use) => {
    const checkoutPages = new CheckoutPage(page);

    await use(async ({ userEmail }) => {
      await allureStep(`[${userEmail}] Open checkout page`, async () => {
        await checkoutPages.goto();
      });

      return { page, checkoutPages };
    });
  },

  attachInvoiceScreenshot: async ({ context }, use) => {
    await use(async ({ filePath }) => {
      const invoiceText = fs.readFileSync(filePath, 'utf-8');
      const invoicePage = await context.newPage();

      try {
        await invoicePage.setContent(`
          <html>
            <body style="margin:0; background:white;">
              <pre style="
                font-family: monospace;
                font-size: 14px;
                padding: 24px;
                white-space: pre-wrap;
              ">
${invoiceText}
              </pre>
            </body>
          </html>
        `);

        const screenshot = await invoicePage.screenshot({ fullPage: true });
        allure.attachment('Invoice Screenshot', screenshot, 'image/png');

      } finally {
        await invoicePage.close();
      }
    });
  },

  getAllCheckoutData: async ({}, use) => {
    const products = readExcel('checkout.xlsx', 'Sheet1');
    await use(products);
  },
};
