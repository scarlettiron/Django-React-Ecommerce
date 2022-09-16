import React, {useEffect, useState, useContext} from 'react'
import HomeContext from '../context/HomeContext'
import MainHeader from '../components/headers/MainHeader'
import NavBar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import BasicFetch from '../utils/BasicFetch'
import { productUrls } from '../utils/ApiEndPoints'
import '../css/general.css'
import '../css/navbar.css'
import { useParams } from 'react-router-dom'

const Product = () => {
    const {productDetail} = productUrls
    const product_id = useParams()
    const [product, setProduct] = useState(() => null)
    const [loading, setLoading] = useState(() => true)

    const getProduct = async () => {
        const {response, data} = await BasicFetch(`${productDetail.url}${product_id}`)
        if(response.status === 200){
            setProduct(() => data)
            setLoading(() => false)
            return
        }
    }

    useEffect(() => {
        getProduct()
    })


  return (
    <div className='w-100 padding-0'>
        <MainHeader/>
        <NavBar/>

        <Footer/>
    </div>
  )
}

export default Product