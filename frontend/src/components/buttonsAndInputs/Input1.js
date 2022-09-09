import React from 'react'

const Input1 = ({name = null, onChange = null, type='text', placeholder = null}) => {
  return (
    <div className='w-100'>
        <input className='input1' name={name} onChange = {onChange} 
        type={type} placeholder={placeholder}/>
    </div>
  )
}

export default Input1