import React from 'react'
import '../../css/buttons-inputs.css'

const BodyInput = ({placeholder=null, onChange=null, value=null, id='input', 
                    error=null, max=null}) => {
  return (
    <textarea className={error === id ? 'input-error body-input' : 'temp body-input'} 
    name={id} id={id} placeholder={placeholder} onChange={onChange}
    min={15} max={max ? max : 1500}
    />
  )
}

export default React.memo(BodyInput)