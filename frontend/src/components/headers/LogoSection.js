import React from 'react'
import '../../css/general.css'
import { ReactComponent as Logo} from '../../assets/skull.svg'

const LogoSection = () => {
  return (
    <div className='logo-section'>
      <div className='align-items-center'>
        <Logo className={'margin-auto'}/>
      </div>
    </div>
  )
}

export default LogoSection