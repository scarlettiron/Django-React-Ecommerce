import React, {useEffect, useState, useContext} from 'react'
import HomeContext from '../context/HomeContext'
import MainHeader from '../components/headers/MainHeader'
import NavBar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import ImageCarousel from '../components/products/ImageCarousel'
import SelectDropDown from '../components/buttonsAndInputs/SelectDropDown'
import BasicFetch from '../utils/BasicFetch'
import { productUrls } from '../utils/ApiEndPoints'
import ButtonArrowUp from '../components/buttonsAndInputs/ButtonArrowUp'
import ButtonArrowDown from '../components/buttonsAndInputs/ButtonArrowDown'
import InputSquare from '../components/buttonsAndInputs/InputSquare'
import AddToCartBtn from '../components/buttonsAndInputs/AddToCartBtn'
import Loading1 from '../components/LoadingAndErrors/Loading1'
import {formatPrice} from '../utils/PriceFormats'
import '../css/general.css'
import '../css/products.css'
import '../css/buttons-inputs.css'
import { useParams } from 'react-router-dom'


const Product = () => {
    const {productDetail} = productUrls
    const {product_id} = useParams()
    const [product, setProduct] = useState(() => null)
    const [loading, setLoading] = useState(() => true)
    const [error, setError] = useState(() => false)
    const [displayPrice, setDisplayPrice] = useState(() => null)
    const [qty, setQty] = useState(() => 1)
    const [selectedPackage, setSelectedPackage] = useState(() => null)
    const [total, setTotal] = useState(() => null)

    const handleDisplayedPrice = (e) => {
        console.log(formatPrice(product.single_price))
        if(e.target.value === 'default'){
            setDisplayPrice(product.max_price ? `$${formatPrice(product.single_price)} - ${formatPrice(product.max_price)}`
            : `$${formatPrice(product.single_price)}`)
            return
        }
        for(let x in product.packages){
            if(product.packages[x].id === parseInt(e.target.value)){
                setDisplayPrice(`$${formatPrice(product.packages[x].price)}`)
                setSelectedPackage(() => product.packages[x].id)
                break
            }
        }
    }

    const getProduct = async () => {
        const {response, data} = await BasicFetch(`${productDetail.url}${product_id}/`)
        if(response.status === 200){
            setProduct(() => data)
            setDisplayPrice(`$${formatPrice(product.single_price)} - ${formatPrice(product.max_price)}`)
            setLoading(() => false)
            console.log(data)
            return
        }
    }

    const handleSetQty = (action) => {
        if(action === 'plus' && qty < product.inventory){
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

    const handleAddToCart = () => {
        if(!selectedPackage){
            setError('select package')
            return
        }
        let productData = JSON.parse(localStorage.getItem('products'))
        if(productData){
            for(let x in productData){
                if(productData[x].id === product.id){
                    for(let i in productData[x].packages){
                        if(productData[x].packages[i] === selectedPackage){
                            productData[x].packages[i].qty += qty
                            return
                        }
                        productData[x].packages.push({id:selectedPackage, qty:qty})
                        return
                    }
                }
            }
            productData.push({product:product_id, packages:[{id:selectedPackage, qty:qty}]})
        localStorage.removeItem('products')
        }
        else{
            productData = [{product:product_id, packages:[{id:selectedPackage, qty:qty}]}]
        }
        console.log(productData)
        localStorage.setItem(productData)
    }

    useEffect(() => {
        getProduct()
    }, [])


  return (
    <div className='w-100 padding-0'>
        <MainHeader/>
        <NavBar/>
        {loading &&
            <Loading1/>
        }
        <div className='product-container'>
            <div className='product-section'>
                {product &&
                    <ImageCarousel images={product.images}/>
                }
                <div className='w-100'>
                    <h2>TODO add featured ppeocuts here</h2>
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
                <div className='w-90 padding-10'>
                    <h4>About</h4>
                    <p>{product?.description}</p>
                </div>
                
                {product && product.care &&
                    <div className='w-90 padding-10'>
                        <h4>Care</h4>
                        <p>{product.care}</p>
                    </div>
                }

                <div className='w-100'>
                    <SelectDropDown options={product ? product.packages : []} onChange={handleDisplayedPrice}/>
                </div>
                <div className='w-75 margin-top-30 align-items-center flex-nowrap'>
                    <div>
                    <ButtonArrowUp action={() => handleSetQty('plus')}/>
                        <div className='w-100'>
                            <InputSquare 
                            name='qty' 
                            max={product?.inventory} 
                            value={qty}
                            onChange={(e) => handleSetQty(e.target.value)}/>
                        </div>
                    <ButtonArrowDown action={() => handleSetQty('minus')}/>
                    </div>
                    <div className='w-75'>
                        <AddToCartBtn/>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Product