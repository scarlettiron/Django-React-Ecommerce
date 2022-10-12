import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/general.css'
import '../../css/containers-cards.css'

const CategoryCard = ({category}) => {
  return (
    <div className='category-card'>
        <Link to={`categories/${category.title}`} className='w-100 h-100 justify-content-center'>
            <h2>{category.title}</h2>
        </Link>
    </div>
  )
}

export default React.memo(CategoryCard)