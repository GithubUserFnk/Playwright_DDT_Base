class RegisterPage {
    constructor(page){
        this.page = page;
        this.menuRegister = "xpath=//a[i[@class='fa fa-lock']]";
        this.name = "xpath=//input[@data-qa='signup-name']";
        this.email = "xpath=//input[@data-qa='signup-email']";
        this.buttonRegister = "xpath=//button[@data-qa='signup-button']";
        this.radioGender = "xpath=//label[normalize-space()='Mr.']"
        this.password = '#password'
        this.dobDay = '#days'
        this.dobMonths = '#months'
        this.dobYears = '#years'
        this.firstName = "xpath=//input[@data-qa='first_name']"
        this.lastName = "xpath=//input[@data-qa='last_name']"
        this.company = "xpath=//input[@data-qa='company']"
        this.address = "xpath=//input[@id='address1']"
        this.country = '#country'
        this.state = "xpath=//input[@id='state']"
        this.city = "xpath=//input[@id='city']"
        this.zipcode = "xpath=//input[@id='zipcode']"
        this.mobileNumber = "xpath=//input[@id='mobile_number']"
        this.buttonCreateAccount = "xpath=//button[@data-qa='create-account']"
        this.verifyAccountCreated = page.locator("xpath=//h2[@data-qa='account-created']/b")
        this.buttonContinue = "xpath=//a[@data-qa='continue-button']"
    }

    async goto(){
        await this.page.goto('/login');
    }

    async clickMenuRegister() {
        await this.page.click(this.menuRegister);
    }

    async fillName(name) {
        await this.page.fill(this.name, name);
    }

    async fillEmail(email) {
        await this.page.fill(this.email, email);
    }

    async clickRegisterButton() {
        await this.page.click(this.buttonRegister);
    }

    async clickRadioButton(gender){
        await this.page.click(this.radioGender, gender)
    }

    async fillPassword(password){
        await this.page.fill(this.password, password)
    }

    async chooseDob(hari,bulan,tahun){
        await this.page.selectOption(this.dobDay, hari.toString())
        await this.page.selectOption(this.dobMonths, bulan.toString())
        await this.page.selectOption(this.dobYears, tahun.toString())
    }

    async fillNames(firstName, lastName){
        await this.page.fill(this.firstName, firstName)
        await this.page.fill(this.lastName, lastName)
    }

    async fillCompany(kantor){
        await this.page.fill(this.company, kantor)
    }

    async fillAdress(alamat){
        await this.page.fill(this.address, alamat)
    }

    async chooseCountry(kota){
        await this.page.selectOption(this.country, kota.toString())
    }

    async fillState(state){
        await this.page.fill(this.state, state)
    }

    async fillCity(city){
        await this.page.fill(this.city, city)
    }

    async fillZipcode(zipcode){
        await this.page.fill(this.zipcode, zipcode.toString())
    }

    async fillMobileNumber(mobileNumber){
        await this.page.fill(this.mobileNumber, mobileNumber.toString())
    }

    async clickCreateAccount(){
        await this.page.click(this.buttonCreateAccount)
    }

    async clickContinue(){
        await this.page.click(this.buttonContinue)
    }

}

export default RegisterPage;
