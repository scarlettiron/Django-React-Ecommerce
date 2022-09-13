import React from 'react'
import '../../css/general.css'
import '../../css/containers-cards.css'

const FeaturedCard = ({product}) => {
  console.log(product.image)
  return (
    <div className='feature-card' style={{backgroundImage:`url(${product.image})`}}>
        <h1>{product.title}</h1>

    </div>
  )
}

export default FeaturedCard