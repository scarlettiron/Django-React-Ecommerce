import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom'
import CartContext from '../../context/CartContext'
import {ReactComponent as Cart} from '../../assets/cart.svg'
import '../../css/cart.css'

const CartBtn = () => {

    const {cartPrice} = useContext(CartContext)
    const history = useHistory()

  return (
    <div className='cart-btn-container' onClick={() => history.push('/cart')}>
            {cartPrice && cartPrice.totalquantity > 0 && cartPrice.totalquantity  <= 10 &&
                <h3 className='text-absolute'>{cartPrice.totalquantity}</h3>
            }
            {cartPrice && cartPrice.totalquantity > 10 &&
                <h3 className='text-absolute'>10+</h3>
            }
            <Cart viewBox="0 0 60.000000 60.000000" className='cart-svg'/>
       
    </div>
  )
}

export default React.memo(CartBtn)