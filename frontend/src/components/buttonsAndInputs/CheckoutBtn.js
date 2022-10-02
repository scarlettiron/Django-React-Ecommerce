import React from 'react'
import { useHistory } from 'react-router-dom'
import Loading1 from '../LoadingAndErrors/Loading1'
import '../../css/buttons-inputs.css'

const CheckoutBtn = ({action=null, form=null, loading=false}) => {
    const history = useHistory()
  return (
    <button className='checkoutBtn' 
    onClick={action ? () => action() : () => history.push('/checkout')}
    form={loading ? null : form}>
    
    {loading ? <Loading1/> : 'Checkout'}
    
    </button>
  )
}

export default CheckoutBtn