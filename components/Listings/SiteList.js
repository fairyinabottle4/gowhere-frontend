import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Site'

const SiteList = ({user}) => {
  const blogs = useSelector(state => state.sites)
  //Remove child blogs
  const filteredBlogs = blogs.filter(p => p.parent === null)
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
              {filteredBlogs.map(blog => 
              <TableRow key={blog.id}>
                  <Blog blog={blog} user={user} />
              </TableRow>
              
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default SiteList