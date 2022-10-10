import React, {useState} from 'react'
import BasicFetch from '../utils/BasicFetch'
import {staffUrls} from '../utils/ApiEndPoints'
import Loading1 from '../components/LoadingAndErrors/Loading1'
import Button1 from '../components/buttonsAndInputs/Button1'
import Success1 from '../components/LoadingAndErrors/Success1'
import InputAutoResize from '../components/buttonsAndInputs/InputAutoResize'
import Input2 from '../components/buttonsAndInputs/Input2'
import MainHeader from '../components/headers/MainHeader'
import NavBar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import '../css/general.css'
import '../css/contact.css'

const Contact = () => {
    const {createContactRequest} = staffUrls
    const [error, setError] = useState(() => null)
    const [loading, setLoading] = useState(() => false)
    const [success, setSuccess] = useState(() => false)

    const sendContactRequest = async (e) => {
        e.preventDefault()
        setError(() => false)
        const elements = e.target.elements
        for(let x in elements){
            if(!elements[x].value && elements[x].type === 'INPUT'){
                setError(elements[x].name)
                setLoading(() => false)
                return
            }
        }

        const body = e.target.body.value
        const email = e.target.email.value
        setLoading(() => true)
        if(!body){
            setError('body')
            setLoading(() => false)
            return
        }
        const {response, data} = await BasicFetch(createContactRequest.url, {
            method:'POST',
            body:JSON.stringify({body:body, email:email})
        })

        if(response.status === 201){
            setLoading(() => false)
            setSuccess(() => true)
        }
    }
  return (
    <div className='w-100'>
        <MainHeader/>
        <NavBar/>
        {success &&
            <Success1/>
        }
        {
            loading && <Loading1/>
        }
        {!success && !loading &&
            <div className='margin-30'>
                <form onSubmit={sendContactRequest} className='contact-form' id='contact-form'>
                    <h3>Contact Us</h3>
                    <div className='w-100 padding-20'>
                        <Input2 placeholder='email' id='email' type='email'/>
                    </div>
                    {/* <BodyInput placeholder={'Write your message'} id='body' error={error}/> */}
                    <div className='w-100 padding-20'>
                        <InputAutoResize placeholder={'Write your message'} id='body' error={error}/>
                    </div>
                    <div className='margin-30'>
                        <Button1 text={'Send'} form={loading ? null : 'contact-form'} />
                    </div>
                </form>
            </div>
        }
        <div className='margin-top-30'>
            <Footer/>
        </div>
    </div>
  )
}

export default Contact