
const server = process.env.REACT_APP_SERVER_NAME

const taxApi = "https://sales-tax-calculator.p.rapidapi.com/rates"

const HomePageInfoUrls = {
    url:`${server}categories/home-info/`
}

const checkoutUrls = {
    CreateStripeIntent:{
        url:`${server}checkout/create-intent/`,
    }
}

const productUrls = {
    featuredProducts:{
        url:`${server}products/featured-products/`
    },
    productDetail:{
        url:`${server}products/product-detail/`
    },
    productsByCategory:{
        url:`${server}products/by-category/`
    }
}

const cartUrl = {
    url:`${server}products/cart/`,
    methods:['POST']
}

const searchUrls = {
    complex:{
    url: `${server}search/complex/`,
    methods:['GET']
    }
}

const staffUrls = {
    createContactRequest:{
        url:`${server}staff/create-contact-request/`,
        methods:['POST']
    }
}

export {server, HomePageInfoUrls, checkoutUrls, productUrls, searchUrls, 
    cartUrl, taxApi, staffUrls}