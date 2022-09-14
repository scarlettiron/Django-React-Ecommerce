import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/general.css'
import '../../css/containers-cards.css'

const CategoryCard = ({category}) => {
    console.log(category)
  return (
    <div className='category-card'>
        <Link to={category.path} className='w-100 h-100 justify-content-center'>
            <h2>{category.name}</h2>
        </Link>
    </div>
  )
}

export default CategoryCard