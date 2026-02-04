class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.buttonProceed = "xpath=//a[text()='Proceed To Checkout']"
        this.comment = "xpath=//textarea"
        this.buttonPlaceOrder = "xpath=//a[text()='Place Order']"
        this.nameOnCard = "xpath=//input[@data-qa='name-on-card']"
        this.cardNumber = "xpath=//input[@data-qa='card-number']"
        this.cvc = "xpath=//input[@data-qa='cvc']"
        this.expirationMonth = "xpath=//input[@data-qa='expiry-month']"
        this.expirationYear = "xpath=//input[@data-qa='expiry-year']"
        this.pay = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
        this.buttoncontinueShopping = "xpath=//a[@data-qa='continue-button']"
    }

    async goto() {
        await this.page.goto('/view_cart', { waitUntil: 'domcontentloaded' });
    }

    async clickProceed(){
        await this.page.click(this.buttonProceed)
    }

    async fillComment(comment){
        await this.page.fill(this.comment, comment)
    }

    async scrollToPlaceOrder() {
        const button = await this.page.$(this.buttonPlaceOrder);
        await button.scrollIntoViewIfNeeded(); // scroll kalo belum kelihatan
    }

    async placeOrder(){
        await this.page.click(this.buttonPlaceOrder)
    }

    async fillPayment(nameOnCard, cardNumber, cvc, expirationMonth, expirationYear){
        await this.page.fill(this.nameOnCard, String(nameOnCard))
        await this.page.fill(this.cardNumber, String(cardNumber))
        await this.page.fill(this.cvc, String(cvc))
        await this.page.fill(this.expirationMonth, String(expirationMonth))
        await this.page.fill(this.expirationYear, String(expirationYear))
    }

    async clickPay(){
        await this.pay.click()
    }

    async clickContinueShopping(){
        await this.page.click(this.buttoncontinueShopping)
    }
}

export default CheckoutPage;
