import React, {useState, useEffect, useRef, createContext} from 'react'
import BasicFetch from '../utils/BasicFetch'
import {cartUrl} from '../utils/ApiEndPoints'
import {CountRenders} from '../utils/CountRenders'

const CartContext = createContext()
export default CartContext

export const CartContextProvider = ({children, ...rest}) => {
    CountRenders('Cart Context: ')

    const [localStorageCart, setLocalStorageCart] = useState(() => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null)
    const [cart, setCart] = useState(() => localStorage.getItem('cartTotal') ? JSON.parse(localStorage.getItem('cartTotal')) : null)
    const [cartPrice, setCartPrice] = useState(() => null)
    const initialVisit = useRef(true)

    const updateSubtotal = (data) => {
        let orderSubtotal = 0
        data.forEach(prod => {
            prod.packages.forEach(p => {
                orderSubtotal = orderSubtotal + p.price
            })
        })
        setCartPrice({'subtotal':orderSubtotal})
        localStorage.removeItem('cartTotal')
        localStorage.setItem('cartTotal', JSON.stringify({'subtotal':orderSubtotal}))
    }

    const handleGetCartData = async () => {
        if(!localStorageCart) return
        const body = JSON.parse(localStorage.getItem('cart'))
        const {response, data} = await BasicFetch(cartUrl.url, {method:'POST', body:JSON.stringify(body)})
        if(response.status === 200){
            setCart(data)

        }
    }
 
    const updateLocalStorageState = () =>{
        setLocalStorageCart(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null)
    }



    //under construction
    const addToCart = (product, productPackage, qty) => {
        let localStorageProduct = localStorageCart.find(prod => {return prod.product === product})
        if(!localStorageProduct){
            setLocalStorageCart(oldArray => ([
                ...oldArray, {'product':product, 'packages':[{'id':productPackage, 'qty':qty}]}])
                )
        }
        else{
            let localProductPackage = localStorageProduct.packages.find(p => {
                return p.id === productPackage
            })

            if(!localProductPackage){
                localStorageProduct.packages.push({'id':productPackage, 'ordering_quantity':parseInt(qty)})
            }
            else{
                localProductPackage.ordering_quantity = localProductPackage.ordering_quantity + parseInt(qty)
            }
            setLocalStorageCart(localStorageCart)
        }


        localStorage.removeItem('cart')
        localStorage.setItem('cart', JSON.stringify(localStorageCart))
        updateSubtotal(cart)
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
    })

    const cartData = {
        cart:cart,
        updateLocalStorageState: updateLocalStorageState,
        removeFromCart:removeFromCart,
        updatePackageQuantity:updatePackageQuantity,
        addToCart:addToCart,
        handleGetCartData:handleGetCartData,

    }

    return (
        <CartContext.Provider value = {cartData}>
            {children}
        </CartContext.Provider>
    )
}