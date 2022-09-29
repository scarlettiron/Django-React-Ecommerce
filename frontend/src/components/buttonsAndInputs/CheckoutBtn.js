import React from 'react'
import { useHistory } from 'react-router-dom'
import '../../css/buttons-inputs.css'

const CheckoutBtn = () => {
    const history = useHistory()
  return (
    <button className='checkoutBtn' onClick={() => history.push('/checkout')}>Checkout</button>
  )
}

export default CheckoutBtn