import React, { useState } from 'react'
import Input1 from '../buttonsAndInputs/Input1'
import { useHistory } from 'react-router-dom'
import '../../css/buttons-inputs.css'
import '../../css/general.css'
import {ReactComponent as Search} from '../../assets/search-50.svg'

const SearchSection = () => {
  const history = useHistory()
  const [search, setSearch] = useState()
  return (
    <div className='w-50 justify-content-end padding-10'>
        <div className='w-50 align-items-center'>
            <div className='display-inline w-75'>
                <Input1 placeholder={'Search site'} onChange={(e) => {setSearch(e.target.value)}}/>
            </div>
            <div className='display-inline w-25' onClick={() => history.push(`search/?q=${search}`)}>
                <Search className='svg1' viewBox="0 0 50 50"/>
            </div>
        </div>
    </div>
  )
}

export default SearchSection