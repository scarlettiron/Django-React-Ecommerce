import React from 'react'
import '../../css/buttons-inputs.css'
import TextareaAutosize from 'react-textarea-autosize';

const InputAutoResize = ({placeholder, id, error}) => {
  return (
    <TextareaAutosize 
    minRows={5} 
    className={error === id ? `input-error auto-resize-input` : 'auto-resize-input'} 
    id={id}
    name={id}
    placeholder={placeholder}
    />
  )
}

export default React.memo(InputAutoResize)