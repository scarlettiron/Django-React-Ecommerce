import React from 'react'
import '../../css/general.css'
import '../../css/buttons-inputs.css'

const AddToCartBtn = ({form=null, action=null}) => {
  return (
    <button className='add-to-cart' form={form ? form : null} onClick={action ? action : null}>
        Add To Cart
    </button>
  )
}

export default AddToCartBtn