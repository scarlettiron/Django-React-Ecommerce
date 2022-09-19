import React, {useState} from 'react'
import ButtonArrowUp from '../buttonsAndInputs/ButtonArrowUp'
import ButtonArrowDown from '../buttonsAndInputs/ButtonArrowDown'
import InputSquare from '../buttonsAndInputs/InputSquare'
import '../../css/buttons-inputs.css'

const QtyBtn = ({max, id, wrapperClass=null}) => {
    const [qty, setQty] = useState(() => 1)

    const handleSetQty = (action) => {
        if(action === 'plus' && qty < max){
            setQty(qty + 1)
            return
        }
        if(action === 'minus' && qty > 1){
            setQty(qty - 1)
            return
        }
        setQty(action)
        console.log(qty)
    }

  return (
    <div className={wrapperClass ? wrapperClass : null}>
        <ButtonArrowUp action={() => handleSetQty('plus')}/>
            <div className='w-100'>
                <InputSquare 
                name= {id}
                id={id}
                max={max} 
                value={qty}
                onChange={(e) => handleSetQty(e.target.value)}/>
            </div>
        <ButtonArrowDown action={() => handleSetQty('minus')}/>
    </div>
  )
}

export default React.memo(QtyBtn)