import React from 'react'
import '../../css/general.css'
import { ReactComponent as Logo} from '../../assets/skull.svg'

const LogoSection = () => {
  return (
    <div className='w-50 justify-content-start'>
      <div className='align-items-center'>
        <Logo className={'margin-auto'}/>
      </div>
    </div>
  )
}

export default LogoSection