import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/general.css'
import '../../css/containers-cards.css'

const CategoryCard = ({category}) => {
  return (
    <div className='category-card'>
        <Link to={category.path} className='w-100 h-100 justify-content-center'>
            <h1>{category.name}</h1>
        </Link>
    </div>
  )
}

export default CategoryCard