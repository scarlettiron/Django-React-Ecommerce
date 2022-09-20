import React from 'react'
import {formatPrice} from '../../utils/PriceFormats'
import '../../css/select-dropdown.css'

const SelectDropDown = ({options, onChange, wrapperClass = null}) => {

  return (
        <select className={wrapperClass ? `${wrapperClass} classic` : 'classic'} name='packageOptions' id='packageOptions' onChange={onChange}>
            <option value='placeholder'>Choose a package</option>
            {
                options.map((opt, index) => {
                    return <option value={opt.id} key={index}>QTY:{opt.qty} Price: ${formatPrice(opt.price)}</option>
                })
            }
        </select>
  )
}

export default SelectDropDown