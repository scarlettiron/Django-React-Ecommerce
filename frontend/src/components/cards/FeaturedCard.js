import React from 'react'
import Button1 from '../buttonsAndInputs/Button1'
import { useHistory } from 'react-router-dom'
import { formatPrice } from '../../utils/PriceFormats'
import '../../css/general.css'
import '../../css/containers-cards.css'

const FeaturedCard = ({product}) => {
  const history = useHistory()
  return (
    <div className='feature-card' onClick={() => history.push(`/product/${product.FeaturedCardMain}`)}>
      <div className='h-75 w-100 overflow-hidden'>
        <img className='featured-card-img'  src={product.images[0].file} alt={product.title}/>
      </div>
      <div className='padding-0 margin-0 w-100 justify-content-center'>
        <h3 className='padding-0 margin-0 text-secondary'>{product.title}</h3>
      </div>
      <div className=' feature-info padding-0 margin-0 w-90 justify-content-space-around align-items-center'>
        <p className='padding-0 margin-0'>${formatPrice(product.single_price)} {product.max_price && - formatPrice(product.max_price)}</p>
        <Button1 text={'View'} />
      </div>
    </div>
  )
}

export default FeaturedCard