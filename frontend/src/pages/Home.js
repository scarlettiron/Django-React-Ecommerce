import React, {useContext} from 'react'
import HomeContext from '../context/HomeContext'
import MainHeader from '../components/headers/MainHeader'
import NavBar from '../components/navbars/NavBar'
import CategoryCard from '../components/cards/CategoryCard'
import FeaturedCard from '../components/cards/FeaturedCard'
import FeaturedCardMain from '../components/cards/FeaturedCardMain'
import Footer from '../components/footers/Footer'
import '../css/general.css'
import '../css/containers-cards.css'

const Home = () => {
  const {categories, featuredProducts} = useContext(HomeContext)

  return (
    <div className='w-100 padding-0'>
        <MainHeader/>
        <NavBar/>
        <div className='container'>
          <div className='w-100 justify-content-center flex-wrap'>
          {categories.results.slice(0, 3).map((cat, index) => {
            return <CategoryCard category={cat} key={index}/>
          })}
          </div>
          <div className='w-100 justify-content-center flex-wrap'>
          {categories.results.slice(3, 6).map((cat, index) => {
            return <CategoryCard category={cat} key={index}/>
          })}
          </div>
        </div>
        <div className='feature-container'>
          {featuredProducts && 
          <>
          <div className='feature-slot'>
            <div className='feature-card-wrapper'>
              <div className='feature-card-wrapper'>
                <FeaturedCard product={featuredProducts[2].product}/>
                <FeaturedCard product={featuredProducts[3].product}/>
              </div>
            </div>
          </div>
          <div className='feature-slot'>
            <div className='feature-card-wrapper-main'>
              <FeaturedCardMain product={featuredProducts[1].product}/>
            </div>  
          </div>
          <div className='feature-slot-bottom'>
            <div className='feature-card-wrapper'>
              <FeaturedCard product={featuredProducts[4].product}/>
              <FeaturedCard product={featuredProducts[5].product}/>
            </div>
          </div>     
          </>
          } 
        </div>
        <Footer/>
    </div>
  )
}

export default Home