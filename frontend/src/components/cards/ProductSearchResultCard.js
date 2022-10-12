import React from 'react'
import { useHistory } from 'react-router-dom'
import { formatPrice } from '../../utils/PriceFormats'
import PrimaryBtn from '../buttonsAndInputs/PrimaryBtn'
import '../../css/containers-cards.css'
import '../../css/general.css'

const ProductSearchResultCard = ({product}) => {
    const history = useHistory()
  return (
    <div className='feature-ad margin-30' onClick={() => {history.push(`/product/${product.id}`)}}>
        <div className='w-100 justify-content-center'>
            <img src={product.images[0].file} alt='feature ad'/>
        </div>
        <div className='w-100 justify-content-center'>
            <h3 className='text-secondary margin-0 padding-0'>{product.title}</h3>
        </div>
        <div className='w-100 justify-content-center'>
            <p className='margin-0 padding-0 text-third'>${formatPrice(product.single_price)} { product.max_price && - formatPrice(product.max_price)}</p>
        </div>
        <div className='w-100 justify-content-center'>
            <PrimaryBtn text='View Product'/>
        </div>

    </div>
  )
}

export default React.memo(ProductSearchResultCard)