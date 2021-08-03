import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  //Remove child blogs
  const filteredBlogs = blogs.filter(p => p.parent === null)
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
              {filteredBlogs.map(blog => 
              <TableRow key={blog.id}>
                  <Blog blog={blog} />
              </TableRow>
              
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs