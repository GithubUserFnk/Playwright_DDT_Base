import fs from 'fs';
import path from 'path';

/**
 * Ambil screenshot + attach ke Playwright report
 * Folder screenshot otomatis dibuat per run berdasarkan testInfo.
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').TestInfo} testInfo
 * @param {string} name - nama screenshot
 */
export async function takeScreenshot(page, testInfo, name) {
  // Folder report/screenshot otomatis berdasarkan testInfo.outputDir
  const screenshotFolder = path.join(testInfo.outputDir, 'screenshots');
  fs.mkdirSync(screenshotFolder, { recursive: true });

  const filePath = path.join(screenshotFolder, `${name}.png`);
  await page.screenshot({ path: filePath });

  // Attach ke report HTML
  await testInfo.attach(name, { path: filePath, contentType: 'image/png' });
}
