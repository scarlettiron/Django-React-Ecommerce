import React from 'react'
import '../../css/buttons-inputs.css'

const InputSquare = ({id, max}) => {
  return (
    <input id={id} name={id} className='input-square' 
    max={max} min='1' placeholder='1' type='number'/>
  )
}

export default InputSquare