import React from 'react'
import {formatPrice} from '../../utils/PriceFormats'
import '../../css/select-dropdown.css'

const SelectDropDown = ({options, onChange, wrapperClass = null, id = null}) => {

  return (
        <select className={wrapperClass ? `${wrapperClass} classic` : 'classic'} name={id} id={id} onChange={onChange}>
            <option value='placeholder'>Choose a package</option>
            {
                options.map((opt, index) => {
                    if(opt.out_of_stock) return <option 
                        value={opt.id} 
                        key={index}
                        disabled
                        >
                        QTY:{opt.qty} 
                        Price: ${formatPrice(opt.price)}
                        {opt.outofstock && 'out of stock'}
                        </option>

                    return <option 
                    value={opt.id} 
                    key={index}
                    >
                    QTY:{opt.qty} 
                    Price: ${formatPrice(opt.price)}
                    {opt.outofstock && 'out of stock'}
                    </option>
                    
                })
            }
        </select>
  )
}

export default React.memo(SelectDropDown)