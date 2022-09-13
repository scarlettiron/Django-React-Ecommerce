import React from 'react'
import '../../css/general.css'
import '../../css/containers-cards.css'

const FeaturedCard = ({product}) => {
  console.log(product)
  return (
    <div className='feature-card'>
        <h1>{product.title}</h1>

    </div>
  )
}

export default FeaturedCard