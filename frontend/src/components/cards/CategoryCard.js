import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/general.css'
import '../../css/containers-cards.css'

const CategoryCard = ({category}) => {
  return (
    <div className='category-card'>
        {category.placeholder ?
            <>
              <img src={category.placeholder} alt={category.title}/>
              <h2 className='subcategory-card-title-absolute'>{category.title}</h2>
            </>
            :
            <h2 className='margin-0 subcategory-card-text'>{category.title}</h2>
        }
    </div>
  )
}

export default React.memo(CategoryCard)