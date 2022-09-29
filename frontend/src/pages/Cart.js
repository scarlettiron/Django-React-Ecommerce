import React, {useContext, useEffect} from 'react'
import CartContext from '../context/CartContext'
import MainHeader from '../components/headers/MainHeader'
import NavBar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import CartItem from '../components/cart/CartItem'
import CheckoutBtn from '../components/buttonsAndInputs/CheckoutBtn'

import '../css/general.css'
import '../css/cart.css'

const Cart = () => {
  const {cart, handleGetCartData} = useContext(CartContext)

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
            return <CartItem product={item} key={index}/>
          })
        }
      </div>
      <div className='w-100 justify-content-center'>
          <div className='checkout-btn-wrapper'>
          <CheckoutBtn/>
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default Cart