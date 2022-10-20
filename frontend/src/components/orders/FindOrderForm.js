import React, {useState} from 'react'
import BasicFetch from '../../utils/BasicFetch'
import { orderUrls } from '../../utils/ApiEndPoints'
import formInputChecker from '../../utils/FormInputChecker'
import UnderlineInput from '../../components/buttonsAndInputs/UnderlineInput'
import GradientBtn from '../../components/buttonsAndInputs/GradientBtn'
import Loading1 from '../../components/LoadingAndErrors/Loading1'
import '../../css/general.css'
import '../../css/orders.css'

const FindOrderForm = ({setOrder}) => {
    const [loading, setLoading] = useState(() => false)
    const [error, setError] = useState(() => false)

    
    const {findOrder} = orderUrls

    const handleRetreiveOrder = async (e) => {
        if(error) {setError(() => false)}
        e.preventDefault()
        const hasError = formInputChecker(e, setError)
        if(hasError) return

        setLoading(() => true)

        const {response, data} = await BasicFetch(`${findOrder.url}${e.target.orderid.value}/${e.target.lastname.value}/${e.target.zip.value}/`)
        if(response.status === 200){
            setOrder({...data, response:response.statuo})
            setLoading(() => false)
            return
        }
        if(response.status === 404){
            setOrder({response:response.status})
            setLoading(() => false)
            return
        }


    }
  return (
    <form className='find-order-container' onSubmit={handleRetreiveOrder} id='findorderform'> 
        {loading && <Loading1/>}

        {!loading &&
        <>
        <div className='w-100 justify-content-center'>
            <h1>Find your Order</h1>
        </div>
        <div className='w-90'>
            <UnderlineInput
            placeholder={'Order Id (Found in email confirmation)'} 
            id='orderid' 
            wrapperClass={'w-75'}
            error={error}
            />
        </div>
        <div className='w-90 '>
            <UnderlineInput
            placeholder={'Last Name of Buyer'}
            id='lastname'
            wrapperClass={'w-50'}
            error={error}
            />
            <UnderlineInput
            placeholder={'Zipcode'}
            id='zip'
            wrapperClass={'w-25'}
            type={'number'}
            error={error}
            />
        </div>
        <div className='w-100 justify-content-center margin-30'>
            <GradientBtn form='findorderform' text='Find Order'/>
        </div> 
        </>
        }
    </form>
  )
}

export default FindOrderForm