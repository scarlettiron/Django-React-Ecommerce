import { CardElement, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js'
import React, {useRef} from 'react'
import {checkoutUrls} from '../../utils/ApiEndPoints'
import '../../css/general.css'

const CheckoutPopup = () => {

    const placeholderData = {
        products:{
            1:{
                product:1,
                quantity:3
            }
        },
        shipping : {
            street:'4848 hootie hoot rd',
            city:'beboop',
            state:'GA',
            zip:'31419'
        },
        first_name : 'scarlett',
        last_name : 'ss',
        email : 'scrapper@gmail.com',
        phone : '14782208801'
    }

    const {CreateStripeIntent} = checkoutUrls
    //const intent = useRef()
    
    const stripe = useStripe()
    const elements = useElements()

    const handleCreateIntent = async () => {
        const response = await fetch(
            CreateStripeIntent.url, {
                method:'POST',
                headers : {
                    'Content-type':'application/json'
                },
                body:JSON.stringify(placeholderData)
            }
        )

        if(response.status === 201){
            const data = await response.json()
            console.log(data)
            handleConfirmPayment(data.intent)
        }
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
            console.log(error)
        }
        if(paymentIntent.status === 'succeeded'){
            console.log(paymentIntent.id)
        }
    }
  

  return (
    <div>
            <h1 >Card</h1>
            <CardElement />
        <button onClick={handleCreateIntent}>Checkout</button>
    </div>
  )
}

export default CheckoutPopup