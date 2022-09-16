import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import '../../css/general.css'
import '../../css/navbar.css'

const NavDropMulti = ({links}) => {
    const history = useHistory()

    const [dropDownMulti, setDropDownMulti] = useState(() => true)
    const toggle = () => {
        console.log('toggle')
        setDropDownMulti(!dropDownMulti)
    }

    console.log(links)

  return (
    <div className='nav-drop-multi temp'>
                <h1>I'm a dropdown</h1>
                {links.map((link, index) => {
                    return <React.Fragment key={index}>
                        <div className='nav-dropdown-link' onClick={() => history.push(link.path)}>
                            <h4 className='padding-0 margin-0 text-secondary'>{link.name}</h4>
                        </div>
                    </React.Fragment>
                })}

    </div>
  )
}

export default NavDropMulti