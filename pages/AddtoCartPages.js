// pages/AddtoCartPage.js
class AddtoCartPage {
    constructor(page) {
        this.page = page;

        // 🔹 Selectors
        this.searchField = '#search_product';
        this.buttonSearch = '#submit_search';
        this.overlayCard = '.product-overlay';
        this.buttonAddtoCart = '.product-overlay .add-to-cart';
        this.buttonContinueShopping = "xpath=//button[@class='btn btn-success close-modal btn-block']";
    }

    // 🔹 Buka halaman products
    async goto() {
        await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
    }

    // 🔹 Isi search dan submit
    async fillSearch(search) {
        await this.page.fill(this.searchField, search);
        await this.page.click(this.buttonSearch);

        // scroll sedikit biar overlay muncul
        await this.page.evaluate(() => window.scrollBy(0, 300));

        // tunggu overlay muncul, safe untuk headless
        await this.page.waitForSelector(this.overlayCard, { state: 'visible', timeout: 5000 });
    }

    // 🔹 Klik Add to Cart dengan handling headless
    async clickAddtoCart() {
        // hover tetap dilakukan untuk headed browser
        await this.page.hover(this.overlayCard);

        // tunggu tombol Add to Cart muncul
        await this.page.waitForSelector(this.buttonAddtoCart, { state: 'visible', timeout: 5000 });

        // klik tombol Add to Cart, paksa jika headless
        await this.page.click(this.buttonAddtoCart, { force: true });

        // tunggu Continue Shopping button muncul
        await this.page.waitForSelector(this.buttonContinueShopping, { state: 'visible', timeout: 5000 });
        await this.page.click(this.buttonContinueShopping, { force: true });

        // optional: jeda sebentar biar animasi selesai
        await this.page.waitForTimeout(500);
    }

    // 🔹 Clear search field
    async clearSearchField() {
        await this.page.fill(this.searchField, '');
        await this.page.click(this.buttonSearch);
        await this.page.waitForTimeout(500); // biar search selesai
    }
}

export default AddtoCartPage;
