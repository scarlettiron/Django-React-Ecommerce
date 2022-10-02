import React, {useContext} from 'react'
import { Elements, CardElement, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js'
import CheckoutContext from '../../context/CheckoutContext'
import CheckoutBtn from '../../components/buttonsAndInputs/CheckoutBtn'
import '../../css/checkout.css'
import '../../css/general.css'
const CheckoutSection = () => {
    const {handleCreateIntent, StCheckoutIntent} = useContext(CheckoutContext)
  
    const stripe = useStripe()
    const elements = useElements()
  
    const handlePayment = async () => {
        console.log('handlign payment')
      const intent = await handleCreateIntent()
      console.log(intent)
      if(intent){
        await handleConfirmPayment(StCheckoutIntent.current)
      }
    }
  
    const handleConfirmPayment = async (intent) => {
      console.log(intent)
      const {error, paymentIntent} = stripe.confirmCardPayment(
          intent, {
              payment_method:{
                  type: 'card',
                  card: elements.getElement(CardElement),
                  }
              })
      if(error){
          console.log(error)
      }
      if(paymentIntent.status === 'succeeded'){
          console.log(paymentIntent.id)
      }
  }
  return (
    <div className='w-100'>
        <CardElement className='card-input'/>
        <div className='w-100 justify-content-center padding-10'>
            <CheckoutBtn action={handlePayment}/>
        </div>
    </div>
  )
}

export default CheckoutSection