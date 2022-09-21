import React, {useState, useEffect, createContext} from 'react'
import BasicFetch from '../utils/BasicFetch'
import {cartUrl} from '../utils/ApiEndPoints'

const CartContext = createContext()
export default CartContext

export const CartContextProvider = ({children, ...rest}) => {

    const [localStorageCart, setLocalStorageCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null)
    const [cart, setCart] = useState(null)

    const handleGetCartData = async () => {
        console.log('getting cart data')
        if(!localStorageCart) return

        const body = JSON.parse(localStorage.getItem('cart'))
        const {response, data} = await BasicFetch(cartUrl.url, {method:'POST', body:JSON.stringify(body)})
        console.log(response.status)
        
    }
 


    const cartData = {
        cart:cart
    }

    useEffect(() => {
        console.log('cart context use effect')
        handleGetCartData()
    },[])

    return (
        <CartContext.Provider value = {cartData}>
            {children}
        </CartContext.Provider>
    )
}