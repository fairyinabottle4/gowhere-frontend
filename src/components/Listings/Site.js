import React, {useRef} from 'react'
import TogglableSite from './TogglableSite'
import SiteDetails from './SiteDetails'
import PropTypes from 'prop-types'
import {
  TableCell,
} from '@material-ui/core'

const Site = React.forwardRef((props, ref) => {
  const siteRef = useRef()
  let combinedRef
  if (!props.search) {
    combinedRef = ref.concat(siteRef)
  }
  return (
  <div style={siteContainer}>
    <TableCell style={siteNameContainer}>
      <p style={siteName}>{props.site.title} </p>
      <TogglableSite buttonLabel="view site" level="detail" ref={siteRef} title={props.site.title}>
        <SiteDetails key={props.site.id} site={props.site} user={props.user} 
          ref={props.search ? null : combinedRef} className="site" />
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
}

const siteName = {
  fontSize: '20px',
}

