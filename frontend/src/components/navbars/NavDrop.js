import React from 'react'
import { useHistory } from 'react-router-dom';
import Dropdown from 'react-multilevel-dropdown';
import '../../css/general.css'
import '../../css/navbar.css'

const NavDrop = ({links=null, title}) => {
    const history = useHistory()

    const categoryRedirect = (category) => {
        
        if(!category.hasOwnProperty('subcategory')){
            history.push(`/products/${category.title}`)
        }
        else if(category.hasOwnProperty('subcategory') && category.subcategories.length === 0){
            history.push(`/products/${category.title}`)
        }
    }

  return (
    <Dropdown 
    title = {title} 
    wrapperClassName='nav-item' 
    buttonClassName='temp nav-btn' 
    menuClassName='nav-item' 
    openOnHover={true}>

        {links && links.length > 0 &&
        
            links.map((link, index) => {
                 return (<Dropdown.Item className='nav-item' key={index} onClick={()=> categoryRedirect(link)}>
                    {link.title}
                    {link.subcategories && link.subcategories.length > 0 && 
                    <Dropdown.Submenu openOnHover={true} className='nav-item'> 
                        {link.subcategories.map((item, index) => {
                             return (<Dropdown.Item className='nav-item' key={index} onClick={() => history.push(`/products/${item.title}`)}>
                                {item.title}
                            </Dropdown.Item>
                        )})}
                    </Dropdown.Submenu>
                    }
                </Dropdown.Item>
            )})}

    </Dropdown>
  )
}

export default React.memo(NavDrop)