import React, {useState, useEffect, useRef, createContext} from 'react'
import BasicFetch from '../utils/BasicFetch'
import {cartUrl} from '../utils/ApiEndPoints'
import {CountRenders} from '../utils/CountRenders'
import { da } from 'date-fns/locale'

const CartContext = createContext()
export default CartContext

export const CartContextProvider = ({children, ...rest}) => {
    CountRenders('Cart Context: ')

    const [localStorageCart, setLocalStorageCart] = useState(() => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null)
    const [cart, setCart] = useState(() => null)
    const [cartPrice, setCartPrice] = useState(() => localStorage.getItem('cartTotal') ? JSON.parse(localStorage.getItem('cartTotal')) : {subtotal:0})
    const initialVisit = useRef(true)

    const updateSubtotal = (data=null, packagePrice=null, quantity=null) => {
        let orderSubtotal = cartPrice.subtotal
        if(data){
            data.forEach(prod => {
                prod.packages.forEach(p => {
                    orderSubtotal = orderSubtotal + p.price
                })
            })
        }
        else{
            orderSubtotal = orderSubtotal + (packagePrice * quantity)
        }
        setCartPrice({subtotal:orderSubtotal})
        localStorage.removeItem('cartTotal')
        localStorage.setItem('cartTotal', JSON.stringify({'subtotal':orderSubtotal}))
    }

    const handleGetCartData = async () => {
        if(!localStorageCart) return
        const body = JSON.parse(localStorage.getItem('cart'))
        const {response, data} = await BasicFetch(cartUrl.url, {method:'POST', body:JSON.stringify(body)})
        if(response.status === 200){
            setCart(data)
            updateSubtotal(data)

        }
    }
 
    const updateLocalStorageState = () =>{
        setLocalStorageCart(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null)
    }

    const addToLocalStorage = (data, price, qty) => {
        console.log(data)
        localStorage.removeItem('cart')
        localStorage.setItem('cart', JSON.stringify(data))
        updateLocalStorageState()
        updateSubtotal(null, price, qty)
    }


    const addToCart = (product, productPackage, qty) => {
        qty = parseInt(qty)

        const newLocalCartPackage = {'package':productPackage.id, 'ordering_quantity':qty}
        const newLocalCartProduct = {'product':product, 'packages':[newLocalCartPackage]}

        const storageCart = JSON.parse(localStorage.getItem('cart'))

        if(!storageCart){
            addToLocalStorage([newLocalCartProduct], productPackage.price, qty)
            return
        }

        let prod = storageCart.findIndex(item => {return item.product === product})
        if(prod === -1){
            storageCart.push(newLocalCartProduct)
            addToLocalStorage(storageCart, productPackage.price, qty)
            return
        }

        let pac = storageCart[prod].packages.findIndex(p => {return p.package === productPackage.id})
        
        if(pac === -1){
            storageCart[prod].packages.push(newLocalCartPackage)
            addToLocalStorage(storageCart, productPackage.price, qty)
            return
        }

        storageCart[prod].packages[pac].ordering_quantity = storageCart[prod].packages[pac].ordering_quantity + qty

        addToLocalStorage(storageCart, productPackage.price, qty)
        return
    }


    //removes package from cart
    const removeFromCart = (product, pack) => {

        //remove from local storage state
        let deleteProductCompletely = false
        for(let x in localStorageCart){
            if(localStorageCart[x].product === product && localStorageCart[x].packages.length === 1){
                deleteProductCompletely = true
                break
            }
        }

        if(deleteProductCompletely){
            const filteredLocalStorage = localStorageCart.filter(item => {
                return item.product !== product
            })

            //if there are no products being purchased set states to null
            if(filteredLocalStorage.length === 0){
                setLocalStorageCart(null)
                setCart(null)
                localStorage.removeItem('cart')
                setCartPrice(null)
                return
            }

            setLocalStorageCart(() => filteredLocalStorage)
            localStorage.removeItem(cart)
            localStorage.setItem('cart', JSON.stringify(filteredLocalStorage))

            const filteredCart = cart.filter(item => {
                return item.id !== product
            })
            setCart(filteredCart)
            updateSubtotal(cart)
            return
        }

        //if other packages being purchased for product
         setLocalStorageCart(oldState => {
            oldState.forEach(product => {
                const newPackages = product.packages.filter(pac => {
                    return pac.id !== pack
                })
                product.packages = newPackages
                return product
            })
        }) 


        //setLocalStorageCart(localStorageCart)
        localStorage.removeItem('cart')
        localStorage.setItem('cart', JSON.stringify(localStorageCart))

        //handle removing full cart data
        for(let x in cart){
            if(cart[x].id === product){
                const newPackages = cart[x].packages.filter(pac => {
                    return pac.id !== pack
                })
                cart[x].packages = newPackages
                return
            }
        }
        setCart(cart)
        updateSubtotal(cart)
    }


    //update package quantity in cart
    const updatePackageQuantity = (product, pack, newQty) => {
                const prod = localStorageCart.find((p) => {return p.product === product})
                const productPackage = prod.packages.find((p) => {return p.id === pack})
                productPackage.ordering_quantity = newQty
                setLocalStorageCart(localStorageCart) 
        
                localStorage.removeItem('cart')
                localStorage.setItem('cart', JSON.stringify(localStorageCart))
        
                const cartProd = cart.find((prod) => {return prod.id === product})
                const cartPack = cartProd.packages.find((p) => {return p.id === pack})
                cartPack.ordering_quantity = newQty
                setCart(cart) 

                updateSubtotal(cart)
    }
   

    useEffect(() => {
        if(!initialVisit) return
        const initialLoad = async () => {
            await handleGetCartData()
            initialVisit.current = false
        }
        initialLoad()
    }, [])

    const cartData = {
        cart:cart,
        updateLocalStorageState: updateLocalStorageState,
        removeFromCart:removeFromCart,
        updatePackageQuantity:updatePackageQuantity,
        handleGetCartData:handleGetCartData,
        addToCart:addToCart,

    }

    return (
        <CartContext.Provider value = {cartData}>
            {children}
        </CartContext.Provider>
    )
}