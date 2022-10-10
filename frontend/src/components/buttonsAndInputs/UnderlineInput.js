import React from 'react'
import '../../css/buttons-inputs.css'

const UnderlineInput = ({placeholder, id, error}) => {
  return (
    <input className={error === id ? 'input-error underline-input' : 'underline-input'}
    id={id} name={id} placeholder={placeholder}
    />
  )
}

export default UnderlineInput