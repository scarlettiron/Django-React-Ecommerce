import React from 'react'
import '../../css/buttons-inputs.css'

const UnderlineInputDark = ({onChange, id, placeholder, type='text', wrapperClass=null, 
min=null, error=null}) => {

    return (
        <input className={error === id ? `underline-input-dark underline-input-error ${wrapperClass}` : `${wrapperClass} underline-input-dark`} placeholder={placeholder} onChange={onChange}
        name={id} id={id} type={type} min={min}
        />
      )
}

export default React.memo(UnderlineInputDark)