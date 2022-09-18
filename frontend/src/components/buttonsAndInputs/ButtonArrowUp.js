import React from 'react'
import {ReactComponent as Arrow} from '../../assets/ArrowUp.svg'
import '../../css/buttons-inputs.css'
const ButtonArrowUp = ({action}) => {
  return (
    <button className='button-controls' onClick={action}>
        <Arrow className='svg1' viewBox="0 0 64.000000 64.000000"/>
    </button>
  )
}

export default ButtonArrowUp