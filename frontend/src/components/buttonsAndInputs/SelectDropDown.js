import React from 'react'
import '../../css/select-dropdown.css'

const SelectDropDown = ({options}) => {
  return (
        <select className='classic' name='packageOptions' id='packageOptions'>
            <option value='placeholder'>Choose a package</option>
            {
                options.map((opt, index) => {
                    return <option value={opt.pk} key={index}>QTY:{opt.qty}  Price: ${opt.price / 100}</option>
                })
            }
        </select>
  )
}

export default SelectDropDown