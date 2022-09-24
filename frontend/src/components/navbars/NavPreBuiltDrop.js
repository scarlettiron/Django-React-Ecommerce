import React from 'react'
import Dropdown from 'react-multilevel-dropdown';
import '../../css/general.css'
import '../../css/navbar.css'

const NavPreBuiltDrop = ({links}) => {
  return (
        <Dropdown title = 'Animals' wrapperClassName='nav-item' 
        buttonClassName='nav-btn' menuClassName='nav-item'>
            <Dropdown.Submenu>
                <Dropdown.Item className='nav-item'>
                    Item1
                </Dropdown.Item>
            </Dropdown.Submenu>
        </Dropdown>
  )
}

export default NavPreBuiltDrop