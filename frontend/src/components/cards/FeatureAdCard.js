import React from 'react'
import { useHistory } from 'react-router-dom'
import { formatPrice } from '../../utils/PriceFormats'
import GradientBtn from '../buttonsAndInputs/GradientBtn'
import '../../css/containers-cards.css'
import '../../css/general.css'

const FeatureAdCard = ({ad}) => {
    const history = useHistory()
  return (
    <div className='feature-ad' onClick={() => {history.push(`/product/${ad.id}`)}}>
        <div className='w-100 justify-content-center'>
            <img src={ad.images[0].file} alt='feature ad'/>
        </div>
        <div className='w-100 justify-content-center'>
            <h3 className='text-secondary margin-0 padding-0'>{ad.title}</h3>
        </div>
        <div className='w-100 justify-content-center'>
            <p className='margin-0 padding-0 text-third'>${formatPrice(ad.single_price)} {ad.max_price && - formatPrice(ad.max_price)}</p>
        </div>
        <div className='w-100 justify-content-center padding-10'>
            <GradientBtn text='View Product'/>
        </div>

    </div>
  )
}

export default React.memo(FeatureAdCard)