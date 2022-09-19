import React, {useState} from 'react'
import {ReactComponent as ArrowLeft} from '../../assets/ArrowLeft.svg'
import {ReactComponent as ArrowRight} from '../../assets/ArrowRight.svg'
import ButtonArrowLeft from '../buttonsAndInputs/ButtonArrowLeft'
import ButtonArrowRight from '../buttonsAndInputs/ButtonArrowRight'
import '../../css/general.css'
import '../../css/image-carousel.css'

const ImageCarousel = ({alt = "image", images}) => {

    const [curIndex, setCurIndex] = useState(() => 0)

    const changeIndex = (e) => {
        setCurIndex(parseInt(e.target.name))
    }

    const changeIndexBtn = (action) => {
        if(action === 'plus'){
            if(curIndex === images.length - 1){
                setCurIndex(() => 0)
                return
            }
            setCurIndex(() => curIndex + 1)
            return
        }
        if(action === 'minus'){
            if(curIndex === 0){
                setCurIndex(() => images.length - 1)
                return
            }
            setCurIndex(() => curIndex - 1)
            return
        }

    }

  return (
    <div className='carousel-container'>
        {/* main slide */}
        <div className='main-image-wrapper'>
                    
        <div className='btn-wrapper'>
            <ButtonArrowLeft action={() => changeIndexBtn('minus')}/>
            <ButtonArrowRight action={() => changeIndexBtn('plus')}/>
        </div>
            {
                images.map((image, index) => {
                    if(index === curIndex){
                        return <img className='slide active' src={image.file} alt={alt} key={index}/>
                    }
                    return <img className='slide' src={image.file} alt={alt} key={index}/>
                })
            }
        </div>

        {/*rest of images */}
        <div className='bottom-slides-wrapper'>
            {images.map((image, index) => {
                if(index === curIndex){
                    return <React.Fragment key={index}>
                        <div className='bottom-slide active-bottom'>
                            <img src={image.file} 
                            alt={alt} key={index} name={index}/>
                        </div>
                        </React.Fragment>
                }
                return  <React.Fragment key={index}>
                        <div className='bottom-slide inactive-bottom' onClick={(e) => changeIndex(e)}>
                            <img src={image.file} 
                            alt={alt} key={index} name={index}/>
                        </div>
                        </React.Fragment>
            })}
        </div>
    </div>
  )
}

export default ImageCarousel