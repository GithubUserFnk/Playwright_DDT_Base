class AddtoCartPage {
    constructor(page) {
        this.page = page;
        this.searchField = '#search_product'
        this.buttonSeacrh = '#submit_search'
        this.overlayCard = '.product-overlay'
        this.buttonAddtoCart = '.product-overlay .add-to-cart'
        this.buttonContinueShopping = "xpath=//button[@class='btn btn-success close-modal btn-block']"
    }

    async goto() {
        await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
    }

    async fillSearch(search) {
        await this.page.fill(this.searchField, search)
        await this.page.click(this.buttonSeacrh)
        await this.page.evaluate(() => {
            window.scrollBy(0, 300);
        });
    }

    async clickAddtoCart(){
        await this.page.hover(this.overlayCard)
        await this.page.click(this.buttonAddtoCart)
        await this.page.click(this.buttonContinueShopping)
    }

    async clearSearchField(){
        await this.page.fill(this.searchField, '')
        await this.page.click(this.buttonSeacrh)
    }
}

export default AddtoCartPage;
