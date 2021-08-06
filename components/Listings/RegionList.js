import React, {useRef} from 'react'
import Togglable from './Togglable'
import SiteList from './SiteList'
import Site from './Site'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Country from './Country'


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