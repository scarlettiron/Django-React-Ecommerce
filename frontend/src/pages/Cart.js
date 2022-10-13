import React, {useContext, useEffect, useState} from 'react'
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
  const [outOfStock, setItemOutOfStock] = useState(() => false)

  const itemOutOfStock = (status) => {
    if(status){
      setItemOutOfStock(status)
    }
  }
  console.log(cart)

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
      </div>
      <div className='w-100 justify-content-center'>
          <div className='checkout-btn-wrapper'>
            {outOfStock ? 
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