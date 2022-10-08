import React from 'react'
import '../../css/errors.css'

const Error1 = ({error=null}) => {
  return (
    <div className='error-container'>
      <h3>{error ? error : "An error has occured"}</h3>
    </div>
  )
}

export default Error1