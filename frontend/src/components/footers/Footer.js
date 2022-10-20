import React from 'react'
import FooterSection from './FooterSection'
import '../../css/footer.css'
import '../../css/general.css'

const Footer = () => {
    const section1 = {title: 'Customer Service', links:[
        {name:'Order Status',
        link:'/tracking/?'},
        {name:'Shipping / Return Policy',
        link:'/termsandconditions'},
        {name:'Contact',
        link:'/contact'},
    ]}

    //TODO
    /* const section2 = {title: 'My Account', links:[
        {name:'Login',
        link:'/login'},
        {name:'Create Account',
        link:'/signup'},
    ]} */

    const section3 = {title: 'Privacy', links:[
        {name:'Privacy Policy',
        link:'/privacy'},
        {name:'Terms And Conditions',
        link:'/termsandconditions'},
    ]}

  return (
    <div className='footer'>
        <div className='footer-section-wrapper'>
            <FooterSection title={section1.title} links ={section1.links}/>
        </div>

        {/* <div className='footer-section-wrapper'>
            <FooterSection title={section2.title} links ={section2.links}/>
        </div> */}
        <div className='footer-section-wrapper'>
            <FooterSection title={section3.title} links ={section3.links}/>
        </div>
    </div>
  )
}

export default React.memo(Footer)