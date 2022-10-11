import React, {useState, useEffect, useRef, createContext} from 'react'
import BasicFetch from '../utils/BasicFetch'
import {cartUrl} from '../utils/ApiEndPoints'
import {CountRenders} from '../utils/CountRenders'

const CartContext = createContext()
export default CartContext

export const CartContextProvider = ({children, ...rest}) => {
    CountRenders('Cart Context: ')

    const [localStorageCart, setLocalStorageCart] = useState(() => localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null)
    const [cart, setCart] = useState(() => null)
    const [cartPrice, setCartPrice] = useState(() => localStorage.getItem('cartTotal') ? JSON.parse(localStorage.getItem('cartTotal')) : {subtotal:0, totalquantity:0})
    const initialVisit = useRef(true)

    const updateSubtotal = (data=null, packagePrice=null, quantity=null, flag='add') => {
        let orderSubtotal = cartPrice.subtotal
        let totalquantity = cartPrice.totalquantity
        if(data){
            data.forEach(prod => {
                prod.packages.forEach(p => {
                    orderSubtotal = orderSubtotal + p.price
                    totalquantity = totalquantity + p.ordering_quantity
                })
            })
        }
        else{
            if(flag === 'add'){
                orderSubtotal = orderSubtotal + (packagePrice * quantity)
                totalquantity = totalquantity + quantity
            }
            else if (flag === 'subtract'){
                orderSubtotal = orderSubtotal - (packagePrice * quantity)
                totalquantity = totalquantity - quantity
            }
        }
        setCartPrice({subtotal:orderSubtotal, totalquantity:totalquantity})
        localStorage.removeItem('cartTotal')
        localStorage.setItem('cartTotal', JSON.stringify({'subtotal':orderSubtotal, 'totalquantity':totalquantity}))
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




    const removeFromCart = (productId, productPackageId) => {
        let cartData = JSON.parse(localStorage.getItem('cart'))
        
        //find product
        //for localStorage
        const product = cartData.findIndex(prod => {return prod.product === productId})
        //for cart state
        const cartProductIndex = cart.findIndex(prod => {return prod.id === productId})
        const cartPackageIndex = cart[cartProductIndex].packages.findIndex( p => {return p.id === productPackageId})
        const productPrice = cart[cartProductIndex].packages[cartPackageIndex].price

        //update cart subtotal
        updateSubtotal(null, productPrice, cartData[product].packages[0].ordering_quantity, 'subtract')

        //if product only has one package added to cart
        if(cartData[product].packages.length === 1){
            cartData.slice(product, 1)

            //if cart has no more products in it
            if(cartData.length === 0){
                localStorage.removeItem('cart')
                localStorage.removeItem('cartTotal')
                updateLocalStorageState()
                setCart(() => null)
                return
            }
            setCart(oldArray => oldArray.filter(item => {return item.id !== productId}))
        }

        const pack = cartData[product].packages.findIndex(p => {return p.package === productPackageId})
        cartData[product].packages = cartData[product].packages.slice(pack, 1)
        localStorage.removeItem('cart')
        localStorage.setItem('cart', JSON.stringify(cartData))
        updateLocalStorageState()
        setCart(oldArray => {
            oldArray.forEach(prod => {
                let newPackageList = prod.packages.filter(pac => {
                    return pac.id !== productPackageId})
                prod.packages = newPackageList
            })
            return oldArray
        })

    }



    //update package quantity in cart
    const updatePackageQuantity = (product, pack, newQty) => {
                newQty = parseInt(newQty)
                const prod = localStorageCart.find((p) => {return p.product === product})
                const productPackage = prod.packages.find((p) => {return p.package === pack})
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