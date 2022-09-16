import React, {useState} from 'react'
import '../../css/general.css'
import '../../css/image-carousel.css'

const ImageCarousel = ({alt = "image", images}) => {
console.log(images)

    const [curIndex, setCurIndex] = useState(() => 0)

    const changeIndex = (e) => {
        console.log(e.target.name)
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
                    return <React.Fragment>
                        <div className='bottom-slide active-bottom'>
                            <img src={image.file} 
                            alt={alt} key={index} name={index}/>
                        </div>
                        </React.Fragment>
                }
                return  <>
                        <div className='bottom-slide inactive-bottom'>
                            <img src={image.file} 
                            alt={alt} key={index} name={index}/>
                        </div>
                        </>
            })}
        </div>
    </div>
  )
}

export default ImageCarousel