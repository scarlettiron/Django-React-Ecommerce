import React, {useState, useContext, useCallback, useRef} from 'react'
import CartContext from '../../context/CartContext'
import QtyBtn from '../buttonsAndInputs/QtyBtn'
import {formatPrice} from '../../utils/PriceFormats'
import '../../css/cart.css'
import '../../css/general.css'

const CartPackage = ({pack, product, itemOutOfStock}) => {
    const {removeFromCart, updatePackageQuantity} = useContext(CartContext)

    const [qty, setQty] = useState(() => pack.ordering_quantity)
    const notEnoughStock = useRef(pack.out_of_stock)

    itemOutOfStock(notEnoughStock)

    const handleUpdateQty = (newQty) => {
        const totalQty = newQty * pack.qty
        if(totalQty <= product.inventory && pack.out_of_stock){
            notEnoughStock.current = false
        }

        if(totalQty > product.inventory){
            notEnoughStock.current = true
        }

        setQty(() => newQty)
        updatePackageQuantity(product.id, pack.id, newQty)
    }

    const removePackage = useCallback(() => {
        removeFromCart(product.id, pack.id)
    }, [product, pack, removeFromCart])


  return (
    <div className={notEnoughStock.current ? `border-red cart-package-item` : 'cart-package-item'}>
            <QtyBtn 
            currentQty={qty}
            onChange={handleUpdateQty}
            />

            <div className='display-inline w-50'>
                {pack.description && !notEnoughStock.current &&
                    <p>{pack.description}  QTY: {pack?.qty}</p>
                }
                {notEnoughStock.current &&
                    <p className='text-red'>{pack?.description} QTY: {pack?.qty}  (Out Of Stock)</p>
                }
            </div>

            <div className='display-inline'>
                <p>${formatPrice(pack.price * pack.ordering_quantity)}</p>
            </div>

            <div className='display-inline'>
                <button className='remove-from-cart-btn' onClick={() => removePackage()}>x</button>
            </div>
    </div>
  )
}

export default React.memo(CartPackage)