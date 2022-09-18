import React from 'react'
import {ReactComponent as Cart} from '../../assets/cart.svg'
import '../../css/general.css'
import '../../css/buttons-inputs.css'

const AddToCartBtn = ({form}) => {
  return (
    <button className='add-to-cart' form={form}>
        Add To Cart
    </button>
  )
}

export default AddToCartBtn