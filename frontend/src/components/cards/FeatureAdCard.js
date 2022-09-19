import React from 'react'
import { formatPrice } from '../../utils/PriceFormats'
import PrimaryBtn from '../buttonsAndInputs/PrimaryBtn'
import '../../css/containers-cards.css'
import '../../css/general.css'

const FeatureAdCard = ({ad}) => {

  return (
    <div className='feature-ad'>
        <div className='w-100 justify-content-center'>
            <img src={ad.images[0].file} alt='feature ad'/>
        </div>
        <div className='w-100 justify-content-center'>
            <h3 className='text-secondary margin-0 padding-0'>{ad.title}</h3>
        </div>
        <div className='w-100 justify-content-center'>
            <p className='margin-0 padding-0 text-third'>${formatPrice(ad.single_price)} - {formatPrice(ad.max_price)}</p>
        </div>
        <div className='w-100 justify-content-center'>
            <PrimaryBtn text='View Product'/>
        </div>

    </div>
  )
}

export default FeatureAdCard