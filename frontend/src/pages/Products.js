import React, {useState, useContext, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import HomeContext from '../context/HomeContext'
import BasicFetch from '../utils/BasicFetch'
import MainHeader from '../components/headers/MainHeader'
import NavBar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import Loading1 from '../components/LoadingAndErrors/Loading1'
import Error1 from '../components/LoadingAndErrors/Error1'

import '../css/general.css'
import '../css/containers-cards.css'

const Products = () => {
    //// For category AND subcategory products /////

    
    const [products, setProducts] = useState(() => [])
    const [error, setError] = useState(() => null)
    const [loading, setLoading] = useState(() => true)

    const {category} = useParams()
    const history = useHistory()


    const getProducts = async () => {
        
    }

  return (
    <div>Products</div>
  )
}

export default Products