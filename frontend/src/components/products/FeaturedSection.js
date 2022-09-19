import React, {useContext} from 'react'
import HomeContext from '../../context/HomeContext'
import FeatureAddCard from '../cards/FeatureAdCard'
import '../../css/general.css'
import '../../css/products.css'
import '../../css/containers-cards.css'

const FeaturedSection = () => {
    const {featuredAds} = useContext(HomeContext)

  return (
    <div className='w-100'>
        <div className='w-100 justify-content-center'>
            <h3>Featured</h3>
        </div>
        <div className='featured-ads-wrapper'>
             {featuredAds &&
                featuredAds.map((ad, index) => {
                    return <FeatureAddCard ad={ad.product} key={index}/>
                })
            } 
        </div>
    </div>
  )
}

export default FeaturedSection