import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import NavDropMulti from './NavDropMulti'
import '../../css/general.css'
import '../../css/navbar.css'

const NavItemDropDown = ({title, links}) => {
    const history = useHistory()

    const [dropDown, setDropDown] = useState(() => false)
    const [dropMulti, setDropMulti] = useState(() => true)
    const toggle = () => {
        console.log('toggle')
        setDropDown(!dropDown)
    }

    const toggleMulti = () =>{
        console.log('multi toggle')
        setDropMulti(!dropMulti)
    }

  return (
    <div className='nav-item'>
        <button className='nav-btn' onClick={() => toggle()}>{title}</button>
        {dropDown &&
            <div className='nav-item-dropdown'>
                {links.map((link, index) => {
                    if(link.multi === true){
                        return  <React.Fragment key={index}>
                                                    {dropMulti &&
                            <NavDropMulti links={link.links}/>
                        }
                            <div className='nav-dropdown-link' onClick={() => toggleMulti()}>
                                <h4 className='padding-0 margin-0 text-secondary'>{link.name}</h4>
                            </div>
                        </React.Fragment>
                    }
                    return <React.Fragment key={index}>
                        <div className='nav-dropdown-link' onClick={() => history.push(link.path)}>
                            <h4 className='padding-0 margin-0 text-secondary'>{link.name}</h4>
                        </div>
                    </React.Fragment>
                })}
            </div>
        }
    </div>
  )
}

export default NavItemDropDown