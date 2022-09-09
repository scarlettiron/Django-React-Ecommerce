import React, {createContext, useState, useEffect} from 'react'
import BasicFetch from '../utils/BasicFetch'
import { HomePageInfo } from '../utils/ApiEndPoints'


const HomeContext = createContext()

export default HomeContext

export const HomeContextProvider = ({children, ...rest}) => {
    const [categories, setCategories] = useState(() => [{'name':'Animals', 'path':'/category/animals'}, 
    {'name':'Feeders', 'path':'/category/feeders'}, 
    {'name':'Supplies', 'path':'/category/supplies'},
    {'name':'Decor', 'path':'/category/decor'},
    {'name':'Specimens', 'path':'/category/specimens'}, 
    {'name':'Auction', 'path':'/category/auction'}])

    const [featuredProducts, setFeaturedProducts] = useState(null)

    const fetchHomeInfo = async () => {
        const {response, data} = await BasicFetch(HomePageInfo.url)
        if(response.staus === 200){
            setFeaturedProducts(data.featuredProducts)
        }
    }

    const HomeContextData = {
        categories:categories,
        featuredProducts:featuredProducts,
    }

    useEffect(() => {
        fetchHomeInfo()
    },[])

  return (
    <HomeContext.Provider value={HomeContextData}>
        {children}
    </HomeContext.Provider>
  )
}

