import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import BasicFetch from '../utils/BasicFetch'
import { productUrls } from '../utils/ApiEndPoints'
import MainHeader from '../components/headers/MainHeader'
import NavBar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import Loading1 from '../components/LoadingAndErrors/Loading1'
import Error1 from '../components/LoadingAndErrors/Error1'
import ProductSearchResultCard from '../components/cards/ProductSearchResultCard'

import '../css/general.css'
import '../css/containers-cards.css'

const Products = () => {
    //// For category AND subcategory products /////
    const {productsByCategory} = productUrls

    const [products, setProducts] = useState(() => [])
    const [error, setError] = useState(() => null)
    const [loading, setLoading] = useState(() => true)

    const {category} = useParams()


    const getProducts = async () => {
        const {response, data} = await BasicFetch(`${productsByCategory.url}${category}/`)
        console.log(data)
        if(response.status === 200){
            console.log('success')
            setProducts(data)
            setLoading(false)
            return 
        }
        setError('Error getting products, come back later')
        setLoading(false)
    }

    useEffect(() => {
        getProducts()
    },[])

  return (
    <div className='w-100'>
        <MainHeader/>
        <NavBar/>
        {loading && <Loading1/>}
        {error && <Error1 message={error}/>}
        <div className='w-90 justify-content-space-around flex-wrap margin-top-30 padding-30'>
            {products && products.count > 0 &&
                products.results.map((product, index) => {
                    return <ProductSearchResultCard product={product} key={index}/>
                })

            }
        </div>
        <Footer/>
    </div>
  )
}

export default Products