import React from 'react'
import BasicFetch from '../utils/BasicFetch'
import {HomePageInfo} from '../utils/ApiEndPoints'
import MainHeader from '../components/headers/MainHeader'
import CategoryCard from '../components/cards/CategoryCard'
import '../css/general.css'

const Home = () => {

  const categories = [{'name':'Animals', 'path':'/category/animals'}, 
  {'name':'Feeders', 'path':'/category/feeders'}, 
  {'name':'Supplies', 'path':'/category/supplies'},
  {'name':'Decor', 'path':'/category/decor'},
  {'name':'Specimens', 'path':'/category/specimens'}, 
  {'name':'Auction', 'path':'/category/auction'}]

  const featuredProducts = async () => {
    const {response, data} = await BasicFetch(HomePageInfo, {method:'GET'})
  }

  return (
    <div className='w-100'>
        <MainHeader/>
        <div className='container'>
          {categories.map((cat, index) => {
            return <CategoryCard category={cat} key={index}/>
          })}
        </div>
    </div>
  )
}

export default Home