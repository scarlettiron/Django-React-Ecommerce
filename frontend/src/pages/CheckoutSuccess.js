import React from 'react'
import MainHeader from '../components/headers/MainHeader'
import Navbar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import '../css/checkout.css'
import '../css/containers-cards.css'

const CheckoutSuccess = () => {
  return (
    <div className='w-100'>
      <MainHeader/>
      <Navbar/>
      <div className='general-container'>
        <h2>An email confirmation for your order has been sent!</h2>
      </div>

      <Footer/>
    </div>
  )
}

export default CheckoutSuccess