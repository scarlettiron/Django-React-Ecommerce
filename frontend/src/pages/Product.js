import React, {useEffect, useState, useContext} from 'react'
import CartContext from '../context/CartContext'
import MainHeader from '../components/headers/MainHeader'
import NavBar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import Divider1 from '../components/general/Divider1'
import ImageCarousel from '../components/products/ImageCarousel'
import SelectDropDown from '../components/buttonsAndInputs/SelectDropDown'
import BasicFetch from '../utils/BasicFetch'
import { productUrls } from '../utils/ApiEndPoints'
import QtyBtn from '../components/buttonsAndInputs/QtyBtn'
import AddToCartBtn from '../components/buttonsAndInputs/AddToCartBtn'
import Loading1 from '../components/LoadingAndErrors/Loading1'
import {formatPrice} from '../utils/PriceFormats'
import '../css/general.css'
import '../css/products.css'
import '../css/buttons-inputs.css'
import { useParams } from 'react-router-dom'
import FeaturedSection from '../components/products/FeaturedSection'


const Product = () => {
    const {productDetail} = productUrls
    const {product_id} = useParams()
    const [product, setProduct] = useState(() => null)
    const [loading, setLoading] = useState(() => true)
    const [error, setError] = useState(() => false)
    const [missingInput, setMissingInput] = useState(() => null)
    const [displayPrice, setDisplayPrice] = useState(() => null)
    const [qty, setQty] = useState(() => 1)
    const [selectedPackage, setSelectedPackage] = useState(() => null)

    const {addToCart} = useContext(CartContext)

    const handleDisplayedPrice = (e) => {
        if(e.target.value === 'default'){
            setDisplayPrice(product.max_price ? `$${formatPrice(product.single_price)} - ${formatPrice(product.max_price)}`
            : `$${formatPrice(product.single_price)}`)
            return
        }
        const pack = product.packages.find(p => {return p.id === parseInt(e.target.value)})
        setDisplayPrice(`$${formatPrice(pack.price)}`)
        setSelectedPackage(pack)
    }

    const getProduct = async () => {
        const {response, data} = await BasicFetch(`${productDetail.url}${product_id}/`)
        if(response.status === 200){
            setProduct(() => data)
            setDisplayPrice(`$${formatPrice(data.single_price)} - ${formatPrice(data.max_price)}`)
            setLoading(() => false)
            return
        }
    }

    const handleSetQty = (newQty) => {
        setQty(() => newQty)
    }


    const handleAddToCart = () => {
        if(!selectedPackage){
            setMissingInput(() => 'select package')
            return
        }
        setMissingInput(() => null)

        addToCart(product.id, selectedPackage, qty)
        return
    }

    useEffect(() => {
        getProduct()
    }, [])


  return (
    <div className='w-100-vw padding-0'>
        <MainHeader/>
        <NavBar/>
        {loading &&
            <Loading1/>
        }
        <div className='product-container margin-top-30'>
            <div className='product-section'>
                {product &&
                    <ImageCarousel images={product.images}/>
                }
                <div className='featured-products-top'>
                    <FeaturedSection />
                </div>
            </div>
            <div className='margin-top-30 product-section'>
                <div className='w-100 justify-content-center'>
                    <h2 className='margin-0 padding-0'>{product?.title}</h2>
                </div>
                <div className='w-100 justify-content-center'>
                    <p className='margin-0 padding-0'>{product?.scientific_name}</p>
                </div>



                <div className='product-section-item'>
                    {product &&
                        <>
                            <h3 className='text-third'>{displayPrice}</h3>
                        </>
                    }
                </div>
                <div className='w-90 padding-30'>
                    <h4>About</h4>
                    <p>{product?.description}</p>
                </div>
                
                {product && product.care &&
                    <div className='w-90 padding-30'>
                        <h4>Care</h4>
                        <p>{product.care}</p>
                    </div>
                }

                <div className='padding-30 add-to-cart-section'>
                    <div className='w-75'>
                        <SelectDropDown 
                        options={product ? product.packages : []} 
                        onChange={handleDisplayedPrice}
                        wrapperClass={missingInput ? 'missing-input' : null}
                        id='package'
                        />
                    </div>
                    <div className='w-75 margin-top-30 align-items-center flex-nowrap'>
                        <QtyBtn 
                        max={product?.inventory} 
                        id='qty' 
                        onChange={handleSetQty}
                        currentQty = {qty}
                        />
                        <div className='w-75'>
                            <AddToCartBtn action={() => handleAddToCart()}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='featured-products-bottom justify-content-center'>
                <div className='w-75 margin-30'>
                    <Divider1/>
                </div>
                <FeaturedSection />
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Product