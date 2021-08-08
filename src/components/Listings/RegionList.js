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

  const midEastSites = filteredSites.filter(s => s.region === "Middle East & Central Asia")
  const sortedmidEastSites = midEastSites.sort((a,b) => sortByCountry(a,b))

  const americaSites = filteredSites.filter(s => s.region === "Americas")
  const sortedAmericaSites = americaSites.sort((a,b) => sortByCountry(a,b))


  const siteDetailsRef = useRef()

  const AsiaTogg = () => {
    //1) generate array of countries by mapping unique values into sets
    //2) then for these sets, map into a Country component and pass in the list of 
    //all the sites available. 
    //3) Filter out only the sites that matches the country
    //4) In the Country component, list.map(Site)
    const countryList = sortedAsiaSites.map(c => c.country) 
    const countrySet = [...new Set(countryList)]
    console.log(countrySet)
    return (
      <div>
        {countrySet.map(c => {
          const sitesinCountry = sortedAsiaSites.filter(s => s.country === c)
          console.log(sitesinCountry)
          return (<Country sites={sitesinCountry} user={user} country={c}/>)
        })}
      </div>
    )
  }

  const EuropeTogg = () => {
    const countryList = sortedEuropeSites.map(c => c.country) 
    const countrySet = [...new Set(countryList)]
    return (
      <div>
        {countrySet.map(c => {
          const sitesinCountry = sortedEuropeSites.filter(s => s.country === c)
          console.log(sitesinCountry)
          return (<Country sites={sitesinCountry} user={user} country={c}/>)
        })}
      </div>
    )
  }

  const AfricaTogg = () => {
    const countryList = sortedAfricaSites.map(c => c.country) 
    const countrySet = [...new Set(countryList)]
    return (
      <div>
        {countrySet.map(c => {
          const sitesinCountry = sortedAfricaSites.filter(s => s.country === c)
          console.log(sitesinCountry)
          return (<Country sites={sitesinCountry} user={user} country={c}/>)
        })}
      </div>
    )
  }

  const MidEastTogg = () => {
    const countryList = sortedmidEastSites.map(c => c.country) 
    const countrySet = [...new Set(countryList)]
    return (
      <div>
        {countrySet.map(c => {
          const sitesinCountry = sortedmidEastSites.filter(s => s.country === c)
          console.log(sitesinCountry)
          return (<Country sites={sitesinCountry} user={user} country={c}/>)
        })}
      </div>
    )
  }

  const AmericaTogg = () => {
    const countryList = sortedAmericaSites.map(c => c.country) 
    const countrySet = [...new Set(countryList)]
    return (
      <div>
        {countrySet.map(c => {
          const sitesinCountry = sortedAmericaSites.filter(s => s.country === c)
          console.log(sitesinCountry)
          return (<Country sites={sitesinCountry} user={user} country={c}/>)
        })}
      </div>
    )
  }



  return (
    <div style={regionContainer}>
      <h1 style={regionName}>Asia-Pacific</h1>
      <Togglable buttonLabel="view asia-pacific" ref={siteDetailsRef} style={regionViewButton} region="asia-pacific">
        <AsiaTogg />
      </Togglable>
      <h1 style={regionName}>Europe</h1>
      <Togglable buttonLabel="view europe" ref={siteDetailsRef} style={regionViewButton} region="europe">
        <EuropeTogg />
      </Togglable>
      <h1 style={regionName}>Africa</h1>
      <Togglable buttonLabel="view africa" ref={siteDetailsRef} style={regionViewButton} region="africa">
        <AfricaTogg />
      </Togglable>
      <h1 style={regionName}>Middle East & Central Asia</h1>
      <Togglable buttonLabel="view middle east & central asia" ref={siteDetailsRef} style={regionViewButton} region="middle east & central asia">
        <MidEastTogg />
      </Togglable>
      <h1 style={regionName}>Americas</h1>
      <Togglable buttonLabel="view americas" ref={siteDetailsRef} style={regionViewButton} region="americas">
        <AmericaTogg />
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