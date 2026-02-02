import { allure } from 'allure-playwright';

export async function allureScreenshot(page, name) {
  const buffer = await page.screenshot();
  await allure.attachment(name, buffer, 'image/png');
}

export async function allureStep(title, action) {
  await allure.step(title, action);
}
