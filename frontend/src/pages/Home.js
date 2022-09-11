import React, {useContext} from 'react'
import HomeContext from '../context/HomeContext'
import MainHeader from '../components/headers/MainHeader'
import CategoryCard from '../components/cards/CategoryCard'
import FeaturedCard from '../components/cards/FeaturedCard'
import '../css/general.css'
import '../css/containers-cards.css'

const Home = () => {
  const {categories, featuredProducts} = useContext(HomeContext)
  const product = {title:'gecko nano nano', min_price : 2000, max_price:5000}

  return (
    <div className='w-100 temp'>
        <MainHeader/>
        <div className='container'>
          {categories.map((cat, index) => {
            return <CategoryCard category={cat} key={index}/>
          })}
        </div>
        <div className='feature-container temp'>
            <FeaturedCard product={product}/>        
        </div>
    </div>
  )
}

export default Home