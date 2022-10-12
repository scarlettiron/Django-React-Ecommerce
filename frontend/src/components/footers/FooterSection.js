import React from 'react'
import { useHistory } from 'react-router-dom'
import '../../css/footer.css'
import '../../css/general.css'

const FooterSection = ({title, links}) => {
    const history = useHistory()
  return (
    <div className='footer-section'>
        <div className='w-100'>
            <h3 className='padding-0 margin-5 text-secondary'>{title}</h3>
        </div>
        {
            links.map((link, index) => {
                return <React.Fragment key={index}>
                <div className='footer-link' onClick={() => history.push(`/${link.path}`)}>
                    <p className='padding-0 margin-0 text-secondary'>{link.name}</p>                   
                </div>
                </React.Fragment>
            })
        }
    </div>
  )
}

export default React.memo(FooterSection)