// pages/AddToCartPage.js
class AddtoCartPage {
    constructor(page) {
        this.page = page;

        // 🔹 Selectors
        this.searchField = '#search_product';
        this.buttonSearch = '#submit_search';
        this.productCard = '.single-products';                  // parent card
        this.overlayCard = '.product-overlay';
        this.buttonAddtoCartOverlay = '.product-overlay .add-to-cart';
        this.buttonAddtoCartDirect = '.productinfo .add-to-cart'; // fallback
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

        // scroll sedikit supaya product card visible
        await this.page.evaluate(() => window.scrollBy(0, 300));

        // tunggu minimal 1 product card muncul
        await this.page.waitForSelector(this.productCard, { state: 'visible', timeout: 10000 });
    }

    // 🔹 Klik Add to Cart dengan handling headless + overlay animasi
    async clickAddtoCart() {
        const card = this.page.locator(this.productCard).first();
        const overlayButton = card.locator(this.buttonAddtoCartOverlay);
        const directButton = card.locator(this.buttonAddtoCartDirect);

        // scroll ke card supaya visible
        await card.scrollIntoViewIfNeeded();

        // paksa hover pakai mouse.move (lebih reliable untuk headless)
        const box = await card.boundingBox();
        if (box) {
            await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await this.page.waitForTimeout(300); // biar overlay animasi muncul
        }

        // tunggu tombol overlay muncul (timeout 10 detik)
        const overlayVisible = await overlayButton.isVisible({ timeout: 10000 }).catch(() => false);

        if (overlayVisible) {
            await overlayButton.click();
        } else {
            // fallback: klik tombol direct
            await directButton.click();
        }

        // tunggu Continue Shopping button muncul
        await this.page.waitForSelector(this.buttonContinueShopping, { state: 'visible', timeout: 10000 });
        await this.page.click(this.buttonContinueShopping);

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
