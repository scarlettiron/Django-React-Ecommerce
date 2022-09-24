import React, {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'
import QtyBtn from '../buttonsAndInputs/QtyBtn'
import {formatPrice} from '../../utils/PriceFormats'
import '../../css/cart.css'
import '../../css/general.css'

const CartPackage = ({pack, product}) => {
    const {removeFromCart} = useContext(CartContext)

    const [qty, setQty] = useState(() => pack.ordering_quantity)

    const handleUpdateQty = (newQty) => {
        setQty(() => newQty)
    }

    console.log(pack)

  return (
    <div className='cart-package-item'>
            <QtyBtn 
            max={product.inventory}
            currentQty={qty}
            onChange={handleUpdateQty}
            />

            <div className='display-inline w-50'>
                {pack.description ? 
                    <p>{pack.description}</p>
                    :
                    <p>Pack of {pack.qty}</p>
                }
            </div>

            <div className='display-inline'>
                <p>${formatPrice(pack.price * pack.ordering_quantity)}</p>
            </div>

            <div className='display-inline'>
                <button onClick={() => removeFromCart(product.id, pack.id)}>x</button>
            </div>
    </div>
  )
}

export default CartPackage