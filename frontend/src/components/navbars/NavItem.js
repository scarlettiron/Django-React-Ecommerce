import React from 'react'
import { useHistory } from 'react-router-dom'
import '../../css/general.css'
import '../../css/navbar.css'

const NavItem = ({item}) => {
    const history = useHistory()
  return (
    <div className= 'nav-item'>
        <button  className={'nav-btn'} onClick={() => history.push(item.path)}>{item.title}</button>
    </div>
  )
}

export default React.memo(NavItem)