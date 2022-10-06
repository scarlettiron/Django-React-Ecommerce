import React, {useContext, useState} from 'react'
import {useHistory, useParams } from 'react-router-dom'
import HomeContext from '../context/HomeContext'
import MainHeader from '../components/headers/MainHeader'
import NavBar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import SubcategoryCard from '../components/cards/SubcategoryCard'

import '../css/general.css'

const Categories = () => {
  const {categories} = useContext(HomeContext)
  const {category} = useParams()
  const history = useHistory()

  const [cat, setCat] = useState(categories.results.find((item) => {return item.title === category}))

  if(cat && cat.subcategories.length === 0){
    history.push(`/products/${cat.title}/`)
  }



  return (
    <div className='w-100'>
        <MainHeader/>
        <NavBar/>
          {cat && cat.subcategories.length > 0 &&
            <div className='w-100 justify-content-space-around padding-30 margin-top-30'>
              {
                cat.subcategories.map((sub, index) => {
                  return <SubcategoryCard 
                          subcategory = {sub} 
                          category = {cat.title}
                          key={index}
                          />
                })
              }
            </div>

          }
        <Footer/>
    </div>
  )
}

export default React.memo(Categories)