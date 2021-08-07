import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Site from './Site'

const SiteList = ({user}) => {
  const sites = useSelector(state => state.sites)
  //Remove child sites
  const filteredSites = sites.filter(p => p.parent === null)
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
              {filteredSites.map(site => 
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

export default SiteList