import React from 'react'

const SelectInput = ({choices, id, placeholder, wrapperClass=null, error=null}) => {
  return (
    <div className={wrapperClass ? `${wrapperClass} margin-30` : 'margin-30'}>
        <select id={id} name={id} className={error === id ? `input-error ${wrapperClass}` : wrapperClass}>
            <option value='placeholder'>{placeholder}</option>
            {choices.map((choice, index) => {
                return <option key={index} value={choice}>{choice}</option>
            })}
        </select>
    </div>
  )
}

export default React.memo(SelectInput)