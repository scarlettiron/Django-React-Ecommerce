import React, {useEffect, useState, useContext} from 'react'
import HomeContext from '../context/HomeContext'
import MainHeader from '../components/headers/MainHeader'
import NavBar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import ImageCarousel from '../components/products/ImageCarousel'
import BasicFetch from '../utils/BasicFetch'
import { productUrls } from '../utils/ApiEndPoints'
import '../css/general.css'
import '../css/products.css'
import { useParams } from 'react-router-dom'

const Product = () => {
    const {productDetail} = productUrls
    const {product_id} = useParams()
    const [product, setProduct] = useState(() => null)
    const [loading, setLoading] = useState(() => true)

    const getProduct = async () => {
        const {response, data} = await BasicFetch(`${productDetail.url}${product_id}/`)
        if(response.status === 200){
            setProduct(() => data)
            setLoading(() => false)
            return
        }
    }

    useEffect(() => {
        getProduct()
    }, [])


  return (
    <div className='w-100 padding-0'>
        <MainHeader/>
        <NavBar/>
        <div className='product-container'>
            <div className='w-50 temp'>
                {product &&
                    <ImageCarousel images={product.images}/>
                }
            </div>
            <div className='w-50'>
                <div className='w-100 justify-content-center'>
                    <h3>{product.title}</h3>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Product