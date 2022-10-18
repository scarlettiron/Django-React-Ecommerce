import React from 'react'
import '../../css/general.css'
import '../../css/buttons-inputs.css'

const GradientBtn = ({text, onClick = null, form=null}) => {
  return (
<button className='gradient-btn' onClick={onClick} form={form}>{text}</button>
  )
}

export default GradientBtn