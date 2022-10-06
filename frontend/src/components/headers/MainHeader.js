import React from 'react'
import LogoSection from './LogoSection'
import SearchSection from './SearchSection'
import '../../css/general.css'
import '../../css/header.css'


const MainHeader = () => {
  return (
    <div className='header bg-black'>
        <LogoSection/>
        <SearchSection/>
    </div>
  )
}

export default MainHeader