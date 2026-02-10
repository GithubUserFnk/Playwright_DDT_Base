import { getAllProducts } from '../../api/getAllProducts.js'

export const getAllProductsFixture = {

    productsApi: async ({ request }, use) => {
        await use(new getAllProducts(request));
    },

}