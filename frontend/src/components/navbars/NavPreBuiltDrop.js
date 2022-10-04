import React from 'react'
import Dropdown from 'react-multilevel-dropdown';
import '../../css/general.css'
import '../../css/navbar.css'

const NavPreBuiltDrop = ({links}) => {
  return (
/*         <Dropdown title = 'Animals' wrapperClassName='nav-item' 
        buttonClassName='nav-btn' menuClassName='nav-item' openOnHover={true}>
            <Dropdown.Submenu>
                <Dropdown.Item className='nav-item'>
                    Item1 heleogtheih
                </Dropdown.Item>
            </Dropdown.Submenu>
        </Dropdown> */
        <Dropdown 
        title = 'Animals' 
        wrapperClassName='nav-item' 
        buttonClassName='temp nav-btn' 
        menuClassName='nav-item' 
        openOnHover={true}>
            {links.map((link, index) => {
                 return (<Dropdown.Item className='nav-item' key={index}>
                    {link.name}
                    {link.multi &&
                    <Dropdown.Submenu openOnHover={true} className='nav-item'> 
                        {link.links.map((item, index) => {
                             return (<Dropdown.Item className='nav-item' key={index}>
                                {item.name}
                            </Dropdown.Item>
                        )})}
                    </Dropdown.Submenu>
                    }
                </Dropdown.Item>
            )})}
        </Dropdown>
  )
}

export default NavPreBuiltDrop