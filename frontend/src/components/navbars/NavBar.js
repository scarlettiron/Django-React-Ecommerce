import React from 'react'
import NavItem from './NavItem'
import NavItemDropDown from './NavItemDropDown'
import NavPreBuiltDrop from './NavPreBuiltDrop'
import '../../css/general.css'
import '../../css/navbar.css'


const NavBar = () => {
    const navOptions = [{title:'Home', path:'/'}]
  return (
    <div className='nav-container'>
        <NavItem item={navOptions[0]}/>
        <NavItemDropDown title='Shop' links={
            [{name:'Animals', multi:true, links:[{name:'reptiles', path:'/reptiles'}]}, 
            {name:'Decor', path:'/decor'}]}/>

        <NavPreBuiltDrop links={
            [{name:'Animals', multi:true, links:[{name:'reptiles', path:'/reptiles'}]}, 
            {name:'Decor', path:'/decor'}]}
        />
        
    </div>
  )
}

export default NavBar