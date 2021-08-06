import React, {useRef} from 'react'
import Togglable from './Togglable'
import SiteList from './SiteList'
import Site from './Site'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Country from './Country'
import { FormHelperText } from '@material-ui/core'


const RegionList = ({ user }) => {
  const sortByCountry = (a,b) => {
    if (a.author < b.author) {
      return -1
    }
    if (a.author > b.author) {
      return 1
    } 
    return 0
  }

  const sites = useSelector(state => state.sites)
  //Remove child sites
  const filteredSites = sites.filter(p => p.parent === null)
  const asiaSites = filteredSites.filter(s => s.region === "Asia-Pacific")
  const sortedAsiaSites = asiaSites.sort((a,b) => sortByCountry(a,b))
  const siteDetailsRef = useRef()

  const AsiaTogg = () => {
    return (
      <div>
        {sortedAsiaSites.map(c => <Country site={c} user={user}/>)}
      </div>
    )
  }

  return (
    <div style={regionContainer}>
      <h1 style={regionName}>Asia-Pacific</h1>
      <Togglable buttonLabel="view asia-pacific" ref={siteDetailsRef} style={regionViewButton}>
        <AsiaTogg />
      </Togglable>
    </div>

  )

}

export default RegionList

const regionContainer = {
  border: '2px solid green',
}

const regionName = {
  border: '2px solid red',
}

const regionViewButton = {
  border: '2px solid red',
}