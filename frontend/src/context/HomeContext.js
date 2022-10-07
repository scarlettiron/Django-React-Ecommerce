import React, {createContext, useState, useEffect, useCallback, useRef} from 'react'
import BasicFetch from '../utils/BasicFetch'
import { HomePageInfoUrls } from '../utils/ApiEndPoints'


const HomeContext = createContext()

export default HomeContext

export const HomeContextProvider = ({children, ...rest}) => {
    const placeholderCategories = {results: [
        {title:'Animals', subcategories:[{title: 'Feeders'}, {title:'Turtles', placeholder:true}, {title:'Lizards'}]}, 
        {name:'Feeders', path:'/category/feeders'}, 
        {name:'Supplies', path:'/category/supplies'},
        {name:'Decor', path:'/category/decor'},
        {name:'Specimens', path:'/category/specimens'}, 
        {name:'Auction', path:'/category/auction'}]}
    
    const initialLoad = useRef(true)
    const [categories, setCategories] = useState(placeholderCategories)


    const [featuredProducts, setFeaturedProducts] = useState(() => null)
    const [featuredAds, setFeaturedAds] = useState(() => null)


    const fetchHomeInfo = useCallback(async () => {
        const {response, data} = await BasicFetch(HomePageInfoUrls.url)
        if(response.status === 200){
            setFeaturedAds(() => data.featuredproducts)
            const products = {}
            for (const x in data.featuredproducts){
                let index = String(data.featuredproducts[x].slot)
                products[index] = data.featuredproducts[x]
            }
            setFeaturedProducts(() => products)
            setCategories(data)
        }
    }, [])

    const HomeContextData = {
        categories:categories,
        featuredProducts:featuredProducts,
        featuredAds:featuredAds,
    }

    useEffect(() => {
        if(featuredAds) return
        if(!initialLoad) return
        console.log('useEffect running')
        fetchHomeInfo()
    },[])

  return (
    <HomeContext.Provider value={HomeContextData}>
        {children}
    </HomeContext.Provider>
  )
}

