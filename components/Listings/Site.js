import React, {useRef} from 'react'
import Togglable from './Togglable'
import SiteDetails from './SiteDetails'
import PropTypes from 'prop-types'
import {
  TableCell,
} from '@material-ui/core'
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"


const Site = ({site, user}) => {
  const siteStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const siteDetailsRef = useRef()

  return (
  <div style={siteStyle} className='site'>
    <TableCell className='site-title-author'>
      <Link to={`/sites/${site.id}`}>
      {site.title} 
      </Link>
    </TableCell>
    <TableCell>{site.author}</TableCell>
    <Togglable buttonLabel="view" ref={siteDetailsRef}>
      <SiteDetails key={site.id} site={site} user={user}/>
    </Togglable>
  </div>)  
}

Site.propTypes = {
  site: PropTypes.object.isRequired,
}

export default Site
