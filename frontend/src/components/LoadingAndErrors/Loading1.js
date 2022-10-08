import React from 'react'
import Button1 from '../buttonsAndInputs/Button1'
import '../../css/loader.css'

const Loading1 = ({btnAction = null}) => {
  return (
    <div className='lds-container'>
      {btnAction && <><div className='lds-btn-wrapper'><Button1 action={btnAction} text={'cancel'}/></div></>}
      <div className='lds-wrapper'>
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  )
}

export default Loading1