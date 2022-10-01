import React from 'react'
import '../../css/buttons-inputs.css'

const Input2 = ({onChange, id, placeholder, type='text', wrapperClass=null, 
min=null, error=null}) => {
  return (
    <div className={wrapperClass ? `${wrapperClass} margin-30` : 'margin-30'}>
        <input className={error === id ? `input-error input2` : 'input2'} placeholder={placeholder} onChange={onChange}
        name={id} id={id} type={type} min={min}
        />
    </div>
  )
}

export default Input2