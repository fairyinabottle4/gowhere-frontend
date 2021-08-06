import React, {useRef} from 'react'
import TogglableSite from './TogglableSite'
import SiteDetails from './SiteDetails'
import PropTypes from 'prop-types'
import {
  TableCell,
} from '@material-ui/core'
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"


const Site = React.forwardRef((props, ref) => {
  const siteStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const siteRef = useRef()
  const combinedRef = ref.concat(siteRef)
  return (
  <div style={siteStyle} className='site'>
    <TableCell className='site-title-author'>
      <Link to={`/sites/${props.site.id}`}>
      {props.site.title} 
      </Link>
    </TableCell>
    <TableCell>{props.site.author}</TableCell>
    <TogglableSite buttonLabel="view" level="detail" ref={siteRef}>
      <SiteDetails key={props.site.id} site={props.site} user={props.user} 
        ref={combinedRef} />
    </TogglableSite>
  </div>)  
})

Site.propTypes = {
  site: PropTypes.object.isRequired,
}

export default Site
