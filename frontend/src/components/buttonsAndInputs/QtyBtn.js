import React from 'react'
import ButtonArrowUp from '../buttonsAndInputs/ButtonArrowUp'
import ButtonArrowDown from '../buttonsAndInputs/ButtonArrowDown'
import InputSquare from '../buttonsAndInputs/InputSquare'
import '../../css/buttons-inputs.css'

const QtyBtn = ({id, wrapperClass=null, onChange, currentQty}) => {

    const handleSetQty = (action) => {
        let newQty;

        if(currentQty === 1 && action === 'minus') return

        if(!currentQty && action === 'plus'){
            onChange(1)
            return
        }

        if(action === 'plus'){
            newQty = currentQty + 1
            onChange(newQty)
            return
        }
        if(action === 'minus' && currentQty > 1){
            newQty = currentQty - 1
            onChange(newQty)
            return
        }
        onChange(action)
    }

  return (
    <div className={wrapperClass ? wrapperClass : null}>
        <ButtonArrowUp action={() => handleSetQty('plus')}/>
            <div className='w-100'>
                <InputSquare 
                name= {id}
                id={id}
                value={currentQty}
                onChange={(e) => handleSetQty(e.target.value)}
                min={1}
                />
            </div>
        <ButtonArrowDown action={() => handleSetQty('minus')}/>
    </div>
  )
}

export default React.memo(QtyBtn)