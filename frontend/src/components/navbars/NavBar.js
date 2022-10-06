import React, {useState, useContext} from 'react'
import HomeContext from '../../context/HomeContext'
import NavItem from './NavItem'
import {ReactComponent as Burger} from '../../assets/burger.svg'
import '../../css/general.css'
import '../../css/navbar.css'
import NavDrop from './NavDrop'



const NavBar = () => {
    const navOptions = [{title:'Home', path:'/'}]

    const [dropdown, setDropdown] = useState(() => false)

    const {categories} = useContext(HomeContext)
    const [animals, setAnimals] = useState(() => categories.results.find((item) => {return item.title === 'Animals'}))
  

    const toggle = () => {
      setDropdown(!dropdown)
    }

  return (
    <div className='nav-container'>
        <Burger onClick={()=>toggle()} className='mobile-nav'/>
        <div  className={dropdown ? `nav-item-wrapper active` : 'nav-item-wrapper'}>
          <NavItem item={navOptions[0]} active={dropdown}/>
        </div>
        <div className={dropdown ? `nav-item-wrapper active` : 'nav-item-wrapper'}>
          <NavDrop title='Shop' links={categories.results}/>
        </div>
        <div className={dropdown ? `nav-item-wrapper active` : 'nav-item-wrapper'}>
          <NavDrop title = {'Animals'} links={animals ? animals.subcategories : []}/>
        </div>
        
    </div>
  )
}

export default NavBar