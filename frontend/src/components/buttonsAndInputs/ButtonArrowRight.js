import React from 'react'
import {ReactComponent as ArrowRight} from '../../assets/ArrowRight.svg'
import '../../css/buttons-inputs.css'

const ButtonArrowRight = ({action ={}}) => {
  return (
    <button onClick={action} className='button-controls'>
      <ArrowRight className='svg1'  viewBox="0 0 48.000000 48.000000"/> 
     </button>
)
}

export default React.memo(ButtonArrowRight)