class LoginPage {
    constructor(page){
        this.page = page;
        this.email = "xpath=//input[@data-qa='login-email']"
        this.password = "xpath=//input[@data-qa='login-password']"
        this.buttonLogin = "xpath=//button[@data-qa='login-button']"
    }

    async goto(){
        await this.page.goto('/login', { waitUntil: 'domcontentloaded' });
    }

    async fillLogin(email, password) {
        await this.page.fill(this.email, email)
        await this.page.fill(this.password, password)
    }

    async clickLogin(){
        await this.page.click(this.buttonLogin)
    }

}

export default LoginPage;
