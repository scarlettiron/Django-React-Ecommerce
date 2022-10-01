import React, {useContext} from 'react'
import { Elements} from '@stripe/react-stripe-js'
import { Redirect } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutContext from '../context/CheckoutContext'
import CheckoutSection from '../components/checkout/CheckoutSection'
import MainHeader from '../components/headers/MainHeader'
import Navbar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import '../css/checkout.css'
import '../css/general.css'

const CheckoutCardInfo = () => {
  const {shippingAddress} = useContext(CheckoutContext)
  const stripePromise = loadStripe('pk_test_51J8QwpEpzqddY1hCOO1KJoSkTglaDVhebOVuNIoQgtKjSiEs4sYsfYJuTsNOKqhhFNZmtQq41o9WbIZA5TOkFc7k00gGwOU31h')

  if(!shippingAddress){
    Redirect('/cart')
  }

  return (
    <div className='w-100'>
      <MainHeader/>
      <Navbar/>
      <div className='w-100 justify-content-center'>
        <div className='card-wrapper'>
          <div className='w-100 justify-content-center'>
            <h3>Enter Card Details</h3>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutSection/>
          </Elements>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default CheckoutCardInfo