import React, {createContext, useState, useRef} from "react";
import BasicFetch from "../utils/BasicFetch";
import { checkoutUrls } from "../utils/ApiEndPoints";



const CheckoutContext = createContext()

export default CheckoutContext;

export const CheckoutContextProvider = ({children, ...rest}) => {
    const [StCheckoutIntent, setStCheckoutIntent] = useState(() => null)
    const [shippingAddress, setShippingAddress] = useState(() => null)
    const [name, setName] = useState(() => null)
    const [contact, setContact] = useState(() => null)

    const {createIntent} = checkoutUrls

    const handleCreateIntent = async () => {
        
        const cart = JSON.parse(localStorage.getItem('cart'))
        let order = {}

        cart.products.forEach(item => {
            item.packages.forEach(pack =>{
                let id = pack.id.toString()
                order['products'][id] = {product:item.id, quantity:pack.ordering_quantity}
            })
        })

        console.log(cart)
        
        const fetchConfig = {
            method:'POST',
            body:JSON.stringify({
            shipping:shippingAddress,
            products:cart,
            first_name:name.firstName,
            last_name:name.lastName,
            tax:0,
            email:contact.email,
            phone:contact.phone,
            })
        }

        const {response, data} = await BasicFetch(createIntent.url, fetchConfig)

        if(response.status === 201){
            setStCheckoutIntent(data.intent)
            return true
        }

        return false

    } 



    const CheckoutContextData = {
        StCheckoutIntent:StCheckoutIntent,
        handleCreateIntent:handleCreateIntent,
        setShippingAddress:setShippingAddress,
        setName:setName,
        setContact:setContact,
    }

    return (
        <CheckoutContext.Provider value={CheckoutContextData}>
            {children}
        </CheckoutContext.Provider>
      )
    }