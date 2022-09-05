import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutPopup from './CheckoutPopup'

const CheckoutWrapper = () => {
    const stripePromise = loadStripe('pk_test_51J8QwpEpzqddY1hCOO1KJoSkTglaDVhebOVuNIoQgtKjSiEs4sYsfYJuTsNOKqhhFNZmtQq41o9WbIZA5TOkFc7k00gGwOU31h')

  return (
    <div className='purchase-popup-container'>
        <Elements stripe={stripePromise}>

            <CheckoutPopup/>
        </Elements>
    </div>
  )
}

export default CheckoutWrapper