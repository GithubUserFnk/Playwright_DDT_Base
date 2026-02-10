export class getAllProducts {
    constructor(request){
        this.request = request
        this.baseUrl = 'https://automationexercise.com/api'
    }

    async getProducts(){
        return this.request.get(`${this.baseUrl}/productsList`)
    }
}