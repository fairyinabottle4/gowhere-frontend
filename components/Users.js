import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from '@material-ui/core'
//can use link from Material if this doesn't work
import { Container, PageHeader, PageTitle, TableCentered } from '../globalStyles'

const Users = () => {
    const users = useSelector((state) => state.users)
  
    return (
      <Container whiteBg>
        <PageHeader whiteBg>
          <PageTitle>Users</PageTitle>
        </PageHeader>
        <TableCentered>
          <thead>
            <tr>
              <th></th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link href={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </TableCentered>
      </Container>
    )
  }
  
  export default Users
  