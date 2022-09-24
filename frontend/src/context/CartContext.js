import React, {useState, useEffect, createContext} from 'react'
import BasicFetch from '../utils/BasicFetch'
import {cartUrl} from '../utils/ApiEndPoints'

const CartContext = createContext()
export default CartContext

export const CartContextProvider = ({children, ...rest}) => {

    const [localStorageCart, setLocalStorageCart] = useState(() => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null)
    const [cart, setCart] = useState(() => null)

    const handleGetCartData = async () => {
        console.log('getting cart data')

        const body = JSON.parse(localStorage.getItem('cart'))
        const {response, data} = await BasicFetch(cartUrl.url, {method:'POST', body:JSON.stringify(body)})
        if(response.status === 200){
            setCart(data)
        }
        
    }
 
    const updateLocalStorageState = () =>{
        setLocalStorageCart(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null)
    }

    //removes package from cart
    const removeFromCart = (product, pack) => {

        //remove from local storage state
        let deleteProductCompletely = false
         setLocalStorageCart(oldState => {
            oldState.forEach(product => {
                const newPackages = product.packages.filter(pac => {
                    return pac.id !== pack
                })
                product.packages = newPackages

                //if no packages being purchased for this product set to true
                if(product.packages.length === 0){deleteProductCompletely = true}
                return product
            })
        }) 

        //if no packages being purchases for this product delete from both states
        console.log(localStorageCart)
        //doesn't work yet
/*         if(deleteProductCompletely){
            setLocalStorageCart(oldState => {
                console.log(oldState)
                oldState.filter(prod => {
                    return prod.id !== product
                })
            })

            setCart(oldState => {
                oldState.filter(prod => {
                    return prod.id !== product
                })
            })
            return
        }
 */
        //setLocalStorageCart(localStorageCart)
        console.log(localStorageCart)
        //localStorage.removeItem('cart')
        //localStorage.setItem('cart', JSON.stringify(localStorageCart))

        //handle removing full cart data
        setCart(oldCart => {
            oldCart.forEach(product => {
                const newPacks = product.packages.filter(pac => {
                    return pac.id !== pack
                })
                product.packages = newPacks
                return product
            })
        })

        console.log(cart)
  
    }

   


    const cartData = {
        cart:cart,
        updateLocalStorageState: updateLocalStorageState,
        removeFromCart:removeFromCart,
    }

    useEffect(() => {
        console.log('cart context use effect')
        if(!localStorageCart) return
        handleGetCartData()
    },[])

    return (
        <CartContext.Provider value = {cartData}>
            {children}
        </CartContext.Provider>
    )
}