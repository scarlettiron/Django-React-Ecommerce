import React from 'react'
import {ReactComponent as ArrowLeft} from '../../assets/ArrowLeft.svg'
import '../../css/buttons-inputs.css'

const ButtonArrowLeft = ({action ={}}) => {
  return (
        <button onClick={action} className='button-controls'>
          <ArrowLeft className='svg1'  viewBox="0 0 48.000000 48.000000"/> 
         </button>
  )
}

export default ButtonArrowLeft