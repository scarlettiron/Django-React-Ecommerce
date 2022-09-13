import React, {useContext, useRef} from 'react'
import HomeContext from '../context/HomeContext'
import MainHeader from '../components/headers/MainHeader'
import CategoryCard from '../components/cards/CategoryCard'
import FeaturedCard from '../components/cards/FeaturedCard'
import FeaturedCardMain from '../components/cards/FeaturedCardMain'
import '../css/general.css'
import '../css/containers-cards.css'

const Home = () => {
  const {categories, featuredProducts} = useContext(HomeContext)
  const product = {title:'gecko nano nano', min_price : 2000, max_price:5000, path:'/hkhjk'}
  console.log(featuredProducts)
  return (
    <div className='w-100 padding-0'>
        <MainHeader/>
        <div className='container'>
          {categories.map((cat, index) => {
            return <CategoryCard category={cat} key={index}/>
          })}
        </div>
        <div className='feature-container'>
          {featuredProducts &&
          <>
          <div className='display-inline'>
            <div className='feature-card-wrapper'>
              <div className='h-100 w-100'>
                <FeaturedCard product={featuredProducts[2]}/>
                <FeaturedCard product={featuredProducts[3]}/>
              </div>
            </div>
          </div>
          <div className='display-inline'>
            <div className='feature-card-wrapper-main'>
              <FeaturedCardMain product={featuredProducts[1]}/>
            </div>  
          </div>
          <div className='display-inline'>
            <div className='feature-card-wrapper'>
              <FeaturedCard product={featuredProducts[4]}/>
              <FeaturedCard product={featuredProducts[5]}/>
            </div>
          </div>     
          </>
          } 
        </div>
    </div>
  )
}

export default Home