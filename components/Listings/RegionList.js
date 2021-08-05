import React, {useRef} from 'react'
import Togglable from './Togglable'
import SiteList from './SiteList'
import Site from './Site'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  Hidden
} from '@material-ui/core'

import {
  TableCell,
} from '@material-ui/core'
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"


const RegionList = ({ user }) => {
  const regions = ["Africa", "Asia-Pacific", "Arab States", "Europe and North America",
    "Latin America and the Carribean"]

    const siteStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const sites = useSelector(state => state.sites)
  //Remove child sites
  const filteredSites = sites.filter(p => p.parent === null)
  const asiaSites = filteredSites.filter(s => s.region === "Asia-Pacific")
  const sortedAsiaSites = asiaSites.sort((a,b) => {
    if (a.author < b.author) {
      return -1
    }
    if (a.author > b.author) {
      return 1
    } 
    return 0
  })
  const siteDetailsRef = useRef()


  const Country = ({site, user}) => {
    return (
      <div>
        <TableCell>
          {site.author}
        </TableCell>
        <Togglable buttonLabel="view">
          <Site site={site} user={user} />
        </Togglable>
      </div>
    )
  }

  const AsiaTogg = () => {
    return (
      <div>
        {sortedAsiaSites.map(c => <Country site={c} user={user}/>)}
      </div>
    )
  }

  return (
    <div>
      <h2>Asia-Pacific</h2>
      <Togglable buttonLabel="view" ref={siteDetailsRef}>
        <AsiaTogg />
      </Togglable>
    </div>

  )

}

export default RegionList