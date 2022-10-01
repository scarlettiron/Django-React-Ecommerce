import React from 'react'
import { useHistory } from 'react-router-dom'
import '../../css/buttons-inputs.css'

const CheckoutBtn = ({action=null, form=null}) => {
    const history = useHistory()
  return (
    <button className='checkoutBtn' 
    onClick={action ? () => action : () => history.push('/checkout')}
    form={form}>
    
    Checkout</button>
  )
}

export default CheckoutBtn