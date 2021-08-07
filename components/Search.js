import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  TextField
} from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Site from './Listings/Site'

  
const Search = ({user}) => {
  const [searchInput, setSearchInput] = useState("");

  const sites = useSelector(state => state.sites)
  //Remove child sites
  const filteredSites = sites.filter(p => p.parent === null)

  const onChangeText = (event) => {
    setSearchInput(event.target.value)
  }

  const sitesToShow = searchInput.length === 0 ?
    filteredSites :
    filteredSites.filter(
      (listing) =>
        listing.title.toLowerCase().includes(searchInput.toLowerCase())
        || listing.description.toLowerCase().includes(searchInput.toLowerCase())
        || listing.author.toLowerCase().includes(searchInput.toLowerCase()))

  return (
    <div>
      <h1 style={titleStyle}>Search from the entire list</h1>
      <TextField 
        id="filled-search" 
        label="Search for a UNESCO World Heritage Site!" 
        type="search" 
        variant="outlined"
        onChange={onChangeText}
        style={{
          marginTop: '5%',
          width: '100%',
        }}
        InputProps={{
          style: {
            color: 'red'
          }
        }}
        value={searchInput} />
      {searchInput.length === 0 ? null :
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
              {sitesToShow.map(site => 
              <TableRow key={site.id}>
                  <Site site={site} user={user} search={true} />
              </TableRow>
              
              )}
          </TableBody>
        </Table>
      </TableContainer>
      }
    </div>
      
  )

}

export default Search

const titleStyle = {
  marginTop: '2em',
  border: '2px solid red',
}