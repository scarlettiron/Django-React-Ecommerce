import React, {useContext, useState} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import { useHistory } from 'react-router-dom'
import CheckoutContext from '../../context/CheckoutContext'
import CheckoutBtn from '../../components/buttonsAndInputs/CheckoutBtn'
import '../../css/checkout.css'
import '../../css/general.css'
import Loading1 from '../LoadingAndErrors/Loading1'
import Error1 from '../LoadingAndErrors/Error1'
const CheckoutSection = () => {
    const {handleCreateIntent, StCheckoutIntent} = useContext(CheckoutContext)
  
    const stripe = useStripe()
    const elements = useElements()

    const history = useHistory()
    const [loading, setLoading] = useState(()=>false)
    const [error, setError] = useState(() => false)
  
    const handlePayment = async () => {
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
      const {error, paymentIntent} = stripe.confirmCardPayment(
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
        {loading && <Loading1/>}

        {error && <Error1 message="Something went wrong, please try again later"/>}

        {!loading && !error &&
        <>
            <CardElement className='card-input'/>
            <div className='w-100 justify-content-center padding-10'>
                <CheckoutBtn action={handlePayment}/>
            </div>
        </>
        }
    </div>
  )
}

export default CheckoutSection