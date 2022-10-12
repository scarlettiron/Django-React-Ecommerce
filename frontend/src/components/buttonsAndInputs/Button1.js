import React from 'react'
import '../../css/general.css'
import '../../css/buttons-inputs.css'

const Button1 = ({text, onClick = null, form=null}) => {
  return (
        <button className='button1' onClick={onClick} form={form}>{text}</button>
  )
}

export default React.memo(Button1)