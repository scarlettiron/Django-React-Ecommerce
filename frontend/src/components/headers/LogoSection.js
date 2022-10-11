import React from 'react'
import '../../css/general.css'
import '../../css/logo.css'
import { ReactComponent as Logo} from '../../assets/skull.svg'

const LogoSection = () => {
  return (
    <div className='logo-section'>
      <div className='align-items-center'>
        <Logo className={'margin-auto'}/>
        <h1 className='logo-text'>Skull Creek Exotics</h1>
      </div>
    </div>
  )
}

export default LogoSection