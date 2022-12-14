import React, {createContext, useState, useEffect, useCallback, useRef} from 'react'
import BasicFetch from '../utils/BasicFetch'
import { HomePageInfoUrls } from '../utils/ApiEndPoints'
import DecorIcon from '../assets/photos/aquarium-decor.jpg'


const HomeContext = createContext()

export default HomeContext

export const HomeContextProvider = ({children, ...rest}) => {

    const placeholderCategories = {results: [
        {title:'Animals', subcategories:[
            {title:'Feeders'}, {title: 'Reptiles'},
            {title:'Arachnids'}, {title:'Specimens'}
        ]},
        {title:'Feeders'},
        {title:'Decor', placeholder:DecorIcon}, 
        {title:'Specimens'}, 
        {title:'Supplies'},
        {title:'Auction'}]}
    
    const initialLoad = useRef(true)
    const [categories, setCategories] = useState(placeholderCategories)


    const [featuredProducts, setFeaturedProducts] = useState(() => null)
    const [featuredAds, setFeaturedAds] = useState(() => null)

    const fetchHomeInfo = useCallback(async () => {
        const {response, data} = await BasicFetch(HomePageInfoUrls.url)
        if(response.status === 200){
            if(data.featuredproducts.length > 0){
                const products = {}
                for (const x in data.featuredproducts){
                    let index = String(data.featuredproducts[x].slot)
                    products[index] = data.featuredproducts[x]
                }
                setFeaturedProducts(() => products)
                setFeaturedAds(() => data.featuredproducts)
            }
            if(data.results.length > 0){
                setCategories(data)
            }
        }
    }, [])

    const HomeContextData = {
        categories:categories,
        featuredProducts:featuredProducts,
        featuredAds:featuredAds,
    }

    useEffect(() => {
        if(!initialLoad.current) return
        fetchHomeInfo()
    },[])

  return (
    <HomeContext.Provider value={HomeContextData}>
        {children}
    </HomeContext.Provider>
  )
}

