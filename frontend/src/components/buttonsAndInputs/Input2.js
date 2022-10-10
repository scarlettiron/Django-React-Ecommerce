import React from 'react'
import '../../css/buttons-inputs.css'

const Input2 = ({onChange, id, placeholder, type='text', wrapperClass=null, 
min=null, error=null}) => {
  return (
        <input className={error === id ? `input-error input2` : 'input2'} placeholder={placeholder} onChange={onChange}
        name={id} id={id} type={type} min={min}
        />
  )
}

export default Input2