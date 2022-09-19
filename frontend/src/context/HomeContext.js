import React, {createContext, useState, useEffect} from 'react'
import BasicFetch from '../utils/BasicFetch'
import { HomePageInfo } from '../utils/ApiEndPoints'


const HomeContext = createContext()

export default HomeContext

export const HomeContextProvider = ({children, ...rest}) => {
    const [categories, setCategories] = useState(() => [
    {name:'Animals', path:'/category/animals'}, 
    {name:'Feeders', path:'/category/feeders'}, 
    {name:'Supplies', path:'/category/supplies'},
    {name:'Decor', path:'/category/decor'},
    {name:'Specimens', path:'/category/specimens'}, 
    {name:'Auction', path:'/category/auction'}])

    /* const products = {
        1 : {'title' : 'I"m in the spotlight', min_price: 500, max_price:1500, path : '/product/1', 'image': '../assets/photos/box-turtle.jpg'},
        2 : {'title' : 'second', min_price: 500, max_price:1500, path : '/product/1', 'image': '../assets/photos/aquarium-decor.jpg'},
        3 : {'title' : 'third', min_price: 500, max_price:1500, path : '/product/1', 'image': '../assets/photos/butterflys.jpg'},
        4 : {'title' : 'fourth', min_price: 500, max_price:1500, path : '/product/1', 'image': '../assets/photos/hissingroach.jpg'},
        5 : {'title' : 'fifth', min_price: 500, max_price:1500, path : '/product/1', 'image': '../assets/photos/roach-food.jpg'},
    } */

    const [featuredProducts, setFeaturedProducts] = useState(() => null)
    const [featuredAds, setFeaturedAds] = useState(() => null)

    const fetchHomeInfo = async () => {
        const {response, data} = await BasicFetch(HomePageInfo.url)
        if(response.status === 200){
            setFeaturedAds(() => data.featuredproducts)
            const products = {}
            for (const x in data.featuredproducts){
                let index = String(data.featuredproducts[x].slot)
                products[index] = data.featuredproducts[x]
            }
            setFeaturedProducts(() => products)
        }
    }

    const HomeContextData = {
        categories:categories,
        featuredProducts:featuredProducts,
        featuredAds:featuredAds,
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

