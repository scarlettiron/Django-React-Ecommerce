import React from 'react'
import '../../css/buttons-inputs.css'

const PrimaryBtn = ({text, action}) => {
  return (
    <button onClick={action} className='btn-primary'>
        {text}
    </button>
  )
}

export default PrimaryBtn