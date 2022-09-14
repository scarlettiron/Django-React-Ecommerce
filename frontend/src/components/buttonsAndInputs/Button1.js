import React from 'react'
import '../../css/general.css'
import '../../css/buttons-inputs.css'

const Button1 = ({text, onClick = null}) => {
  return (
    <div>
        <button className='button1' onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button1