import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom'
import CartContext from '../../context/CartContext'
import {ReactComponent as Cart} from '../../assets/cart.svg'
import '../../css/cart.css'

const CartBtn = () => {

    const {cartTotal} = useContext(CartContext)
    const history = useHistory()

  return (
    <div className='cart-btn-container' onClick={() => history.push('/cart')}>
            {cartTotal && cartTotal.totalquantity > 0 &&
                <h3 className='text-absolute'>{cartTotal.totalquantity}</h3>
            }
            <Cart viewBox="0 0 60.000000 60.000000" className='cart-svg'/>
       
    </div>
  )
}

export default React.memo(CartBtn)