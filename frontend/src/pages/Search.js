import React, {useEffect, useState, useRef, useCallback} from 'react'
import BasicFetch from '../utils/BasicFetch'
import {searchUrls} from '../utils/ApiEndPoints'
import {useLocation} from 'react-router-dom'
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
    
    const [searchResults, setSearchResults] = useState(() => null)
    const [loading, setLoading] = useState(() => true)

    console.log(searchResults)

    const {complex} = searchUrls

    const getSearchResults = useCallback( async () => {
        const {response, data} = await BasicFetch(`${complex.url}?q=${apiQ}`)
        if(response.status === 200){
            setSearchResults(data)
            setLoading(() => false)
        }
    }, [apiQ, complex.url])

    const handlePaginateSearchResults = useCallback(async () => {
        if(!searchResults.next) return
        setLoading(() => true)
        const {response, data} = await BasicFetch(searchResults.next)

        const newResults = data.results.filter(prod => {
            const resultIds = searchResults.results.map(p => {return p.id})
            return !resultIds.includes(prod.id)})
        if(response.status === 200){
            setSearchResults((oldArray) => ({
                ...oldArray, results:[...oldArray.results, ...newResults], 
                next:data.next, previous:data.previous
            }))

            setLoading(() => false)
        }
    }, [setSearchResults, searchResults])

    const observer = useRef()


    const handleTrackPosition = async (element) => {
        if(!searchResults.next) return
        if(observer.current) {observer.current.disconnect()}
        observer.current = new IntersectionObserver(async (entries) => {
          if(entries[0].isIntersecting){
            await handlePaginateSearchResults()
          }
        })
        if(element) {await observer.current.observe(element)}
      }

    useEffect(() => {
        getSearchResults()
    }, [search])


    

  return (
    <div className='w-100 padding-0'>
        <div className='w-100'>
            <MainHeader/>
            <NavBar/>
        </div>

        <div className='w-100 justify-content-center'>
            <h2>"{q}"</h2>
        </div>

        <div className='w-100 justify-content-center'>
            <div className='search-results-container'>
                {searchResults && searchResults.count === 0 &&
                    
                    <h3>Couldn't find anything</h3>
                }
            
            {searchResults && searchResults.count > 0 &&
                searchResults.results.map((product, index) => {
                    if(index + 1 === searchResults.results.length && searchResults.next){
                        return <React.Fragment key={index}>
                            <div className='margin-30'>
                                <ProductSearchResultCard product={product}/>
                            </div>
                            <div ref={handleTrackPosition}></div>
                        </React.Fragment>
                    }
                    return <React.Fragment key={index}>
                        <div className='margin-30'>
                            <ProductSearchResultCard product={product} key={index} />
                        </div>
                    </React.Fragment>
                })
            }
            </div>
        </div>

        
        {loading &&
            <Loading1/>
        }
        
        <Footer/>

    </div>
  )
}

export default Search