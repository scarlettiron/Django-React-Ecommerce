import React, {useState} from 'react'
import BasicFetch from '../utils/BasicFetch'
import {staffUrls} from '../utils/ApiEndPoints'
import Loading1 from '../components/LoadingAndErrors/Loading1'
import Error1 from '../components/LoadingAndErrors/Error1'
import '../css/general.css'

const Contact = () => {
    const {createContactRequest} = staffUrls
    const [error, setError] = useState(() => null)
    const [loading, setLoading] = useState(() => false)

    const sendContactRequest = async (e) => {
        setError(() => false)
        const body = e.target.body.value
        setLoading(() => true)
        if(!body){
            setError('body')
            setLoading(() => false)
            return
        }
        const {response, data} = await BasicFetch(createContactRequest, {body:JSON.stringify({body:body})})
        if(response.status === 200){
            setLoading(() => false)
        }
    }
  return (
    <form onSubmit={sendContactRequest} className='contact-form'>

    </form>
  )
}

export default Contact