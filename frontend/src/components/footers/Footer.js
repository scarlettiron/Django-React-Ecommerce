import React from 'react'
import FooterSection from './FooterSection'
import '../../css/footer.css'
import '../../css/general.css'

const Footer = () => {
    const section1 = {title: 'Customer Service', links:[
        {name:'Order Status',
        link:'/orders/find'},
        {name:'Shipping / Return Policy',
        link:'/shipping-return-policy'},
        {name:'Contact',
        link:'/contact'},
        {name:'About',
        link:'/about'},
    ]}

    const section2 = {title: 'My Account', links:[
        {name:'Login',
        link:'/login'},
        {name:'Create Account',
        link:'/signup'},
    ]}

    const section3 = {title: 'Privacy', links:[
        {name:'Privacy Policy',
        link:'/privacy'},
        {name:'Terms And Conditions',
        link:'/termsandconditions'},
    ]}

  return (
    <div className='footer'>
        <FooterSection title={section1.title} links ={section1.links}/>
        <FooterSection title={section2.title} links ={section2.links}/>
        <FooterSection title={section3.title} links ={section3.links}/>
    </div>
  )
}

export default Footer