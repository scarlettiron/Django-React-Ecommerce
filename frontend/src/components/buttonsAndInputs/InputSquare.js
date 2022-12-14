import React from 'react'
import '../../css/buttons-inputs.css'

const InputSquare = ({id, onChange, value}) => {
  return (
    <input id={id} name={id} className='input-square' value={value} onChange={onChange}
     min={1} placeholder='1' type='number'/>
  )
}

export default React.memo(InputSquare)