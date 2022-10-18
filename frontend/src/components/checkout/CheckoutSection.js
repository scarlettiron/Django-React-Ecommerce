import React, {useContext, useState} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import { useHistory } from 'react-router-dom'
import CheckoutContext from '../../context/CheckoutContext'
import CartContext from '../../context/CartContext'
import CheckoutBtn from '../../components/buttonsAndInputs/CheckoutBtn'
import '../../css/checkout.css'
import '../../css/general.css'
import Error1 from '../LoadingAndErrors/Error1'
const CheckoutSection = () => {
    const {handleCreateIntent, StCheckoutIntent, shippingAddress} = useContext(CheckoutContext)
    const {cartPrice} = useContext(CartContext)

    const stripe = useStripe()
    const elements = useElements()

    const history = useHistory()
    const [loading, setLoading] = useState(()=>false)
    const [error, setError] = useState(() => false)
  
    const handlePayment = async () => {
      if(!shippingAddress || cartPrice.subtotal === 0){
        history.push('/cart')
      }
      
      setLoading(true)
      const intent = await handleCreateIntent()

      if(!intent){
        setError(true)
        setLoading(false)
        return
      }
      await handleConfirmPayment(StCheckoutIntent.current)
    }
  
    const handleConfirmPayment = async (intent) => {
      const {error, paymentIntent} = await stripe.confirmCardPayment(
          intent, {
              payment_method:{
                  type: 'card',
                  card: elements.getElement(CardElement),
                  }
              })
      if(error){
          setError(true)
          setLoading(false)
      }
      if(paymentIntent.status === 'succeeded'){
          history.push('/checkout-success')
      }
  }
  return (
    <div className='w-100'>

        {error && <Error1 message="Something went wrong, please try again later"/>}

            <CardElement className='card-input'/>
            <div className='w-100 justify-content-center padding-10'>
                <CheckoutBtn action={!loading && !error ? handlePayment : null} loading={loading}/>
            </div>
    </div>
  )
}

export default CheckoutSection