import React from 'react'
import '../../css/buttons-inputs.css'

const UnderlineInput = ({placeholder, id, error}) => {
  return (
    <input className={error === id ? 'underline-input underline-input-error' : 'underline-input'}
    id={id} name={id} placeholder={placeholder}
    />
  )
}

export default React.memo(UnderlineInput)