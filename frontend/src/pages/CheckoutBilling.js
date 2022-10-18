import React, {useContext, useState} from 'react'
import { useHistory } from 'react-router-dom'
import CheckoutContext from '../context/CheckoutContext'
import MainHeader from '../components/headers/MainHeader'
import Navbar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import UnderlineInputDark from '../components/buttonsAndInputs/UnderlineInputDark'
import CheckoutBtn from '../components/buttonsAndInputs/CheckoutBtn'
import SelectInput from '../components/buttonsAndInputs/SelectInput'
import {fiftyStates} from '../utils/FiftyStates'
import '../css/checkout.css'

const CheckoutBilling = () => {
  const [error, setError] = useState(() => null)
  const [loading, setLoading] = useState(() => false)

  const history = useHistory()

  const {setShippingAddress, setName, setContact} = useContext(CheckoutContext)

  const inputTypes= ['INPUT', 'SELECT']

  const handlePreCheckout = (e) => {
    e.preventDefault()
    setLoading(true)
    const elements = e.target.elements

    for(let x in elements){
      if(!elements[x].value | elements[x].value === "placeholder" && inputTypes.includes(elements[x].nodeName)){
        setError(elements[x].name)
        setLoading(false)
        return
      }
    }
    

    setShippingAddress({
      street:e.target.streetaddress.value,
      city:e.target.city.value,
      state:e.target.state.value,
      zipcode:e.target.zipcode.value
    })

    setName({
      firstName:e.target.firstname.value,
      lastName:e.target.lastname.value
    })

    setContact({
      phone:e.target.phone.value,
      email:e.target.email.value
    })

    history.push('/confirm-purchase')

  }

return (
    <div className='w-100'>
        <MainHeader/>
        <Navbar/>
        <div className='w-100 justify-content-center'>
        <form id='preCheckoutForm' onSubmit={(e) => handlePreCheckout(e)} 
        className='preCheckoutForm'>
            <div className='w-75 margin-30'>
                <h3>Billing Details</h3>
            </div>

            <UnderlineInputDark placeholder={'First Name'} id='firstname' wrapperClass={'checkout-input-md'} error={error}/>

            <UnderlineInputDark placeholder={'Last Name'} id='lastname' wrapperClass={'checkout-input-md'} error={error}/>

            <UnderlineInputDark placeholder={'Street Address'} id='streetaddress' wrapperClass={'checkout-input-lg'} error={error}/>

            <UnderlineInputDark placeholder={'City'} id='city' wrapperClass={'checkout-input-md'} error={error}/>

            <SelectInput 
            choices={fiftyStates} 
            placeholder={'State'} 
            id='state' 
            wrapperClass={'bg-transparent checkout-input-md'} 
            error={error}/>

            <UnderlineInputDark placeholder={'Zipcode'} id='zipcode' wrapperClass={'checkout-input-md'} error={error}/>
        
            <div className='w-75'>
              <div className='w-75 margin-30'>
                <h3>Contact</h3>
              </div>
              <UnderlineInputDark placeholder={'Phone'} id='phone' type='number' wrapperClass={'checkout-input-sm'} error={error}/>
              <UnderlineInputDark placeholder={'Email'} id='email' type='email' wrapperClass={'checkout-input-md'} error={error}/>
            </div>
            <div className='w-100 justify-content-center'>
              <CheckoutBtn form='preCheckoutForm' loading={loading}/>
            </div>
        </form>
        </div>
        <Footer/>
    </div>
  )
}

export default CheckoutBilling