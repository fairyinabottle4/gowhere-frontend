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
        listing.title.toLowerCase().includes(searchInput.toLowerCase()))

  return (
    <div>
      <TextField 
        id="filled-search" 
        label="Search field" 
        type="search" 
        variant="outlined"
        onChange={onChangeText}
        value={searchInput} />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
              {sitesToShow.map(site => 
              <TableRow key={site.id}>
                  <Site site={site} user={user} />
              </TableRow>
              
              )}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
      
  )

}

export default Search