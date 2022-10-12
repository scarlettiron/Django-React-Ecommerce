import React from 'react'
import '../../css/general.css'
import '../../css/buttons-inputs.css'

const AddToCartBtn = ({form=null, action=null, loading=null}) => {
  return (
    <button className='add-to-cart' form={form ? form : null} onClick={action ? action : null}>
        {loading ? 'Loading...' : 'Add To Cart'}
    </button>
  )
}

export default React.memo(AddToCartBtn)