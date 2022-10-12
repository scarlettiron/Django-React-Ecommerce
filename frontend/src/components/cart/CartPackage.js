import React, {useState, useContext, useCallback} from 'react'
import CartContext from '../../context/CartContext'
import QtyBtn from '../buttonsAndInputs/QtyBtn'
import {formatPrice} from '../../utils/PriceFormats'
import '../../css/cart.css'
import '../../css/general.css'

const CartPackage = ({pack, product, itemOutOfStock}) => {
    const {removeFromCart, updatePackageQuantity} = useContext(CartContext)

    const [qty, setQty] = useState(() => pack.ordering_quantity)
    const [notEnoughStock, setNotEnoughStock] = useState(() => pack.out_of_stock)

    const handleUpdateQty = useCallback((newQty) => {
        const totalQty = newQty * pack.qty
        if(totalQty <= product.inventory && pack.out_of_stock){
            itemOutOfStock(false)
            setNotEnoughStock(() => false)
        }

        if(totalQty > product.inventory){
            setNotEnoughStock(() => true)
            itemOutOfStock(true)
        }

        setQty(() => newQty)
        updatePackageQuantity(product.id, pack.id, newQty)
    }, [setNotEnoughStock, pack, product, updatePackageQuantity, itemOutOfStock])

    if(pack.out_of_stock){
        itemOutOfStock(true)
    }

    const removePackage = useCallback(() => {
        if(pack.out_of_stock){
            itemOutOfStock(false)
        }
        removeFromCart(product.id, pack.id)
    }, [product, pack, itemOutOfStock, removeFromCart])


  return (
    <div className={notEnoughStock ? `border-red cart-package-item` : 'cart-package-item'}>
            <QtyBtn 
            max={product.inventory}
            currentQty={qty}
            onChange={handleUpdateQty}
            />

            <div className='display-inline w-50'>
                {pack.description && !notEnoughStock &&
                    <p>{pack.description}  QTY: {pack?.qty}</p>
                }
                {notEnoughStock &&
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