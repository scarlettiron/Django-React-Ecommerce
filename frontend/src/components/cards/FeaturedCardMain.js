import React from 'react'
import GradientBtn from '../buttonsAndInputs/GradientBtn'
import { useHistory } from 'react-router-dom'
import { formatPrice } from '../../utils/PriceFormats'
import '../../css/general.css'
import '../../css/containers-cards.css'

const FeaturedCardMain = ({product}) => {
  const history = useHistory()
  return (
    <div className='feature-card-main' onClick={() => history.push(`/product/${product.id}`)}>
      <div className='h-75 w-100 justify-content-center'>
        <img className='featured-card-img-main'  src={product.images[0].file} alt={product.title}/>
      </div>
      <div className='w-100 justify-content-center padding-0 margin-0'>
        <h1 className='padding-0 margin-0 text-secondary'>{product.title}</h1>
      </div>
      <div className='w-90 justify-content-space-around align-items-center padding-10'>
        <h4 className='padding-0 margin-0'>${formatPrice(product.single_price)} { product.max_price && - formatPrice(product.max_price)}</h4>
        <GradientBtn text={'View'} />
      </div>
    </div>
  )
}

export default React.memo(FeaturedCardMain)