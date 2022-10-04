import React, {useState} from 'react'
import NavItem from './NavItem'
import NavItemDropDown from './NavItemDropDown'
import NavPreBuiltDrop from './NavPreBuiltDrop'
import {ReactComponent as Burger} from '../../assets/burger.svg'
import '../../css/general.css'
import '../../css/navbar.css'
import Dropdown from 'react-multilevel-dropdown'


const NavBar = () => {
    const navOptions = [{title:'Home', path:'/'}]

    const [dropdown, setDropdown] = useState(() => false)
    
    const toggle = () => {
      console.log('toggled')
      setDropdown(!dropdown)
    }

  return (
    <div className='nav-container'>
        <Burger onClick={()=>toggle()} className='mobile-nav'/>
        <div  className={dropdown ? `nav-item-wrapper active` : 'nav-item-wrapper'}>
          <NavItem item={navOptions[0]} active={dropdown}/>
        </div>
        <div className={dropdown ? `nav-item-wrapper active` : 'nav-item-wrapper'}>
          <NavItemDropDown title='Shop' links={
              [{name:'Animals', multi:true, links:[{name:'reptiles', path:'/reptiles'}]}, 
              {name:'Decor', path:'/decor'}]}
              active={dropdown}
              />
        </div>
        <div className={dropdown ? `nav-item-wrapper active` : 'nav-item-wrapper'}>
          <NavPreBuiltDrop links={
              [{name:'Animals', multi:true, links:[{name:'reptiles', path:'/reptiles'}]}, 
              {name:'Decor', path:'/decor'}]}
              active={dropdown}
          />
        </div>
        
    </div>
  )
}

export default NavBar