import React from 'react'
import '../../css/containers-cards.css'

const SubcategoryCard = ({subcategory, onClick}) => {
  return (
    <div className='subcategory-card' onClick={onClick}>
        {subcategory.placeholder &&
            <>
            <img src={subcategory.placeholder} alt={subcategory.title} className='subcategory-card-img'/>
            <h1 className='margin-0 padding-0 subcategory-card-title-absolute'>{subcategory.title}</h1>
            </>
        }
        {!subcategory.placeholder &&
            <h1 className='margin-0 padding-0 subcategory-card-text'>{subcategory.title}</h1>
        }
    </div>
  )
}

export default React.memo(SubcategoryCard)