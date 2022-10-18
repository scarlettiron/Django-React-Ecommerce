import React, {useContext, useEffect, useRef} from 'react'
import CartContext from '../context/CartContext'
import MainHeader from '../components/headers/MainHeader'
import NavBar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import CartItem from '../components/cart/CartItem'
import CheckoutBtn from '../components/buttonsAndInputs/CheckoutBtn'
import {formatPrice} from '../utils/PriceFormats'

import '../css/general.css'
import '../css/cart.css'

const Cart = () => {
  const {cart,  cartPrice,  handleGetCartData} = useContext(CartContext)
  const outOfStock = useRef(false)

  const itemOutOfStock = (status) => {
    if(status){
      outOfStock.current = status
    }
  }
  if(outOfStock.current){
    console.log('out')
  }

  useEffect(() => {
    handleGetCartData()
  }, [])

  return (
    <div className='w-100'>
        <MainHeader/>
        <NavBar/>
      <div className='cart-container'>
        {cart &&
          cart.map((item, index) => {
            return <CartItem product={item} key={index} itemOutOfStock={itemOutOfStock}/>
          })
        }
        {cartPrice.totalquantity === 0 &&
          <h2>You have nothing in your cart</h2>
        }
      </div>
      <div className='w-100 justify-content-center'>
        <div className='checkout-btn-wrapper'>
          <h3>Subtotal: ${formatPrice(cartPrice.subtotal)}</h3>
        </div>
      </div>
      <div className='w-100 justify-content-center'>
          <div className='checkout-btn-wrapper'>
            {outOfStock.current === true ? 
            <h3 className='text-red'>Some items are out of stock, remove them to continue</h3>
            :  
            <CheckoutBtn/>
            }
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default React.memo(Cart)