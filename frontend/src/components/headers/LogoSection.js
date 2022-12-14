import React from 'react'
import '../../css/general.css'
import '../../css/logo.css'
import Logo from '../../assets/ChamSkull.png'

const LogoSection = () => {
  return (
    <div className='logo-section'>
      <div className='align-items-center'>
        <img src={Logo} alt='cham skull' className='margin-auto logo-image'/>
        <h1 className='logo-text'>Skull Creek Exotics</h1>
      </div>
    </div>
  )
}

export default React.memo(LogoSection)