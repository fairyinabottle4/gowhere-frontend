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
  const siteRef = useRef()
  const combinedRef = ref.concat(siteRef)
  console.log(props.site)
  return (
  <div style={siteContainer}>
    <TableCell style={siteNameContainer}>
      <p style={siteName}>{props.site.title} </p>
      <TogglableSite buttonLabel="view site" level="detail" ref={siteRef} title={props.site.title}>
        <SiteDetails key={props.site.id} site={props.site} user={props.user} 
          ref={combinedRef} />
      </TogglableSite>
    </TableCell>
  </div>)  
})

Site.propTypes = {
  site: PropTypes.object.isRequired,
}

export default Site 

const siteContainer = {
  border: '2px solid',
}

const siteNameContainer = {
  border: '2px solid yellow',
}

const siteName = {
  border: '2px solid purple',
  fontSize: '20px',
}

