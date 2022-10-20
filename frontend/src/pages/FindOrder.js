import React, {useState} from 'react'
import MainHeader from '../components/headers/MainHeader'
import Navbar from '../components/navbars/NavBar'
import Footer from '../components/footers/Footer'
import FindOrderForm from '../components/orders/FindOrderForm'
import '../css/general.css'
import '../css/orders.css'
import GradientBtn from '../components/buttonsAndInputs/GradientBtn'

const FindOrder = () => {
    const [order, setOrder] = useState(() => null)



  return (
    <div className='w-100'>
        <MainHeader/>
        <Navbar/>
        <div className='w-100 justify-content-center'>
        {!order &&
            <FindOrderForm setOrder={setOrder} />
        } 
        {order &&
        <div className='find-order-container'>
            <div className='w-100 justify-content-center'>
                <h1>Order Tracking</h1>
            </div>
            {order.response === 404 &&
                <>
                    <h3>Order not Found!</h3>
                    <div className='w-100 justify-content-center'>
                        <GradientBtn text={'Try Again'} action={() => setOrder(() => null)}/>
                    </div>
                </>
            }
            {order.response === 200 &&
                <h3> Your order is {order.status}</h3>
            }
        </div>
        }
        </div>
        <Footer/>
    </div>
  )
}

export default FindOrder