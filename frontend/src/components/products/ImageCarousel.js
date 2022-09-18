import React, {useState} from 'react'
import '../../css/general.css'
import '../../css/image-carousel.css'

const ImageCarousel = ({alt = "image", images}) => {

    const [curIndex, setCurIndex] = useState(() => 0)

    const changeIndex = (e) => {
        console.log(e.target.name)
        setCurIndex(parseInt(e.target.name))
    }

  return (
    <div className='carousel-container'>
        {/* main slide */}
        <div className='main-image-wrapper'>
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