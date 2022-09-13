import React from 'react'
import '../../css/general.css'
import '../../css/containers-cards.css'

const FeaturedCardMain = ({product}) => {
  return (
    <div className='feature-card-main'>
        <h1>{product.title}</h1>
    </div>
  )
}

export default FeaturedCardMain