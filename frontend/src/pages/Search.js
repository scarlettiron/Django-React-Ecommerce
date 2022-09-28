import React, {useEffect, useState, useRef} from 'react'
import BasicFetch from '../utils/BasicFetch'
import {searchUrls} from '../utils/ApiEndPoints'
import {useLocation, useParams} from 'react-router-dom'
import queryString from 'query-string'
import MainHeader from '../components/headers/MainHeader'
import NavBar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import Loading1 from '../components/LoadingAndErrors/Loading1'
import ProductSearchResultCard from '../components/cards/ProductSearchResultCard'
import '../css/search.css'

const Search = () => {
    const {search} = useLocation()
    const {q} = queryString.parse(search)
    const apiQ = q.replace(' ', '+')

    console.log(apiQ)
    
    const [searchResults, setSearchResults] = useState(() => null)
    const [loading, setLoading] = useState(() => true)

    const {complex} = searchUrls

    const getSearchResults = async () => {
        const {response, data} = await BasicFetch(`${complex.url}?q=${apiQ}`)
        if(response.status === 200){
            setSearchResults(data)
            setLoading(() => false)
        }
    }

    useEffect(() => {
        getSearchResults()
    }, [search])

    const handlePaginateSearchResults = async () => {

    }

    const observer = useRef()

    const handleTrackPosition = element => {
      if(!searchResults.next) return
      if(observer.current) {observer.current.disconnect()}
      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
          handlePaginateSearchResults()
        }
      })
      if(element) {observer.current.observe(element)}
    }
    

  return (
    <div className='w-100 padding-0'>
        <div className='w-100'>
            <MainHeader/>
            <NavBar/>
        </div>

        {loading &&
            <Loading1/>
        }

        <div className='w-100 justify-content-center'>
            <h2>"{q}"</h2>
        </div>

        <div className='search-results-container'>
        
            {searchResults && searchResults.length > 0 &&
                searchResults.map((product, index) => {
                    if(index === searchResults.length + 1){
                        return <React.Fragment key={index}>
                            <ProductSearchResultCard product={product}/>
                            <div ref={handleTrackPosition}></div>
                        </React.Fragment>
                    }
                    return <ProductSearchResultCard product={product} key={index} />
                })
            }
        </div>
        
        <Footer/>

    </div>
  )
}

export default Search