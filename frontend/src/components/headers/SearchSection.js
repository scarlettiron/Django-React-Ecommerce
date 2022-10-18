import React, { useState } from 'react'
import Input1 from '../buttonsAndInputs/Input1'
import { useHistory } from 'react-router-dom'
import '../../css/buttons-inputs.css'
import '../../css/general.css'
import {ReactComponent as Search} from '../../assets/search-50.svg'

const SearchSection = () => {
  const history = useHistory()
  const [search, setSearch] = useState(()=>null)
  
  const handleSearch = (e) => {
    if(e.keyCode === 13){
      history.push(`/search/?q=${search}`)
    }
    setSearch(e.target.value)
  }

  return (
    <div className='search-section'>
            <div className='search-input'>
                <Input1 placeholder={'Search site'} onChange={(e) => {handleSearch(e)}} name='searchbox'/>
            </div>
            <div className='display-inline padding-10' onClick={() => history.push(`/search/?q=${search}`)}>
                <Search className='svg1' viewBox="0 0 50 50"/>
            </div>
    </div>
  )
}

export default React.memo(SearchSection)