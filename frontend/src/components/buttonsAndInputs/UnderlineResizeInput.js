import React from 'react'
import '../../css/buttons-inputs.css'
import TextareaAutosize from 'react-textarea-autosize';

const UnderlineResizeInput = ({placeholder, id, error}) => {
  return (
    <TextareaAutosize 
    minRows={5} 
    className={error === id ? `input-error underline-input` : 'underline-input'} 
    id={id}
    name={id}
    placeholder={placeholder}
    />
  )
}

export default UnderlineResizeInput