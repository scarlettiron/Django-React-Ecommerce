
const server = 'http://127.0.0.1:8000/api/'

const taxApi = "https://sales-tax-calculator.p.rapidapi.com/rates"

const HomePageInfo = {
    url:`${server}products/home-info/`
}

const checkoutUrls = {
    CreateStripeIntent:{
        url:`${server}checkout/create-intent/`,
    }
}

const productUrls = {
    featuredProducts:{
        url:`${server}products/featured-products/`
    }
}

export {server, HomePageInfo, checkoutUrls, productUrls}