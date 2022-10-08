import React from 'react'
import '../../css/buttons-inputs.css'

const BodyInput = ({placeholder=null, onChange=null, value=null, id='input', 
                    error=null, max=null}) => {
  return (
    <input className={error === id ? 'input-error body-input' : 'body-input'} 
    name={id} id={id} placeholder={placeholder} value={value} onChange={onChange}
    min={15} max={max ? max : 1500}
    />
  )
}

export default React.memo(BodyInput)