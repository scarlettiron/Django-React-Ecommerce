import React from 'react'
import CartPackage from './CartPackage'
import { useHistory } from 'react-router-dom'
import '../../css/cart.css'
import '../../css/general.css'

const CartItem = ({product, itemOutOfStock}) => {
  const history = useHistory()

  return (
    <div className='cart-item'>
          <div className='cart-product-image' onClick={() => history.push(`/product/${product.id}`)}>
                <img src={product.images[0].file} alt={product.title}/>
            </div>
            <div className='cart-package-container'>
            <div className='w-100 justify-content-center margin-top-30'>
                <h3 className='margin-0 padding-0'>{product.title}</h3>
            </div>

                {
                    product.packages.map((p, index) => {
                        return <CartPackage 
                                pack={p} 
                                product={product} 
                                key={index}
                                itemOutOfStock={itemOutOfStock}
                                />
                    })
                }
            </div>

    </div>
  )
}

export default CartItem