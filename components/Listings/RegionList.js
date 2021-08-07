import React, {useRef} from 'react'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'
import Country from './Country'

const RegionList = ({ user }) => {
  const sortByCountry = (a,b) => {
    if (a.country < b.country) {
      return -1
    }
    if (a.country > b.country) {
      return 1
    } 
    return 0
  }

  const sites = useSelector(state => state.sites)
  //Remove child sites
  const filteredSites = sites.filter(p => p.parent === null)
  const asiaSites = filteredSites.filter(s => s.region === "Asia-Pacific")
  const sortedAsiaSites = asiaSites.sort((a,b) => sortByCountry(a,b))

  const europeSites = filteredSites.filter(s => s.region === "Europe")
  const sortedEuropeSites = europeSites.sort((a,b) => sortByCountry(a,b))

  const africaSites = filteredSites.filter(s => s.region === "Africa")
  const sortedAfricaSites = africaSites.sort((a,b) => sortByCountry(a,b))


  const siteDetailsRef = useRef()

  const AsiaTogg = () => {
    return (
      <div>
        {sortedAsiaSites.map(c => <Country site={c} user={user}/>)}
      </div>
    )
  }

  const EuropeTogg = () => {
    return (
      <div>
        {sortedEuropeSites.map(c => <Country site={c} user={user} />)}
      </div>
    )
  }

  const AfricaTogg = () => {
    return (
      <div>
        {sortedAfricaSites.map(c => <Country site={c} user={user} />)}
      </div>
    )
  }


  return (
    <div style={regionContainer}>
      <h1 style={regionName}>Asia-Pacific</h1>
      <Togglable buttonLabel="view asia-pacific" ref={siteDetailsRef} style={regionViewButton}>
        <AsiaTogg />
      </Togglable>
      <h1 style={regionName}>Europe</h1>
      <Togglable buttonLabel="view europe" ref={siteDetailsRef} style={regionViewButton}>
        <EuropeTogg />
      </Togglable>
      <h1 style={regionName}>Africa</h1>
      <Togglable buttonLabel="view africa" ref={siteDetailsRef} style={regionViewButton}>
        <AfricaTogg />
      </Togglable>
    </div>

  )

}

export default RegionList

const regionContainer = {
  backgroundColor: '#c2c2c2'
}

const regionName = {
  backgroundColor: '#c2c2c2',
  fontFamily: "Roboto"
}

const regionViewButton = {
  
}