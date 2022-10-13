import React from 'react'
import ButtonArrowUp from '../buttonsAndInputs/ButtonArrowUp'
import ButtonArrowDown from '../buttonsAndInputs/ButtonArrowDown'
import InputSquare from '../buttonsAndInputs/InputSquare'
import '../../css/buttons-inputs.css'

const QtyBtn = ({max, id, wrapperClass=null, onChange, currentQty}) => {

    const handleSetQty = (action) => {
        let newQty;
        if(currentQty === 1 && action === 'minus'){ 
            console.log('equals 1 minus')
            return
        }

        if(!currentQty || currentQty === 0) {
            console.log('no current quantity')
            onChange(1)
            return
        }

        if(action === 'plus' && currentQty < max){
            newQty = currentQty + 1
            onChange(newQty)
            console.log('plus')
            return
        }
        if(action === 'minus' && currentQty > 1){
            console.log('minus')
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
                max={max} 
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