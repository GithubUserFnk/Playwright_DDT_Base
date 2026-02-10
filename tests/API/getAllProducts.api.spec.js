// tests/api/products/products.api.spec.js
import { test, expect } from '../../fixtures/API/modular.fixture.js';
import { allure } from 'allure-playwright';

test('get products list should return 200 and data array', async ({ productsApi }) => {
  allure.epic('Products API');
  allure.feature('Get Products List');
  allure.story('Verify API returns products array');

  // Step: Call API
  const response = await allure.step('Call /productsList API', async () => {
    return productsApi.getProducts();
  });

  // Step: Check status code
  await allure.step('Check status code is 200', () => {
    expect(response.status()).toBe(200);
  });

  // Step: Parse response JSON
  const body = await response.json();

  // Step: Validate body
  await allure.step('Check products array exists', () => {
    expect(body).toHaveProperty('products');
    expect(Array.isArray(body.products)).toBe(true);
  });

  // Step: Attach response as evidence
  allure.attachment('Products API Response', JSON.stringify(body, null, 2), 'application/json');
});
