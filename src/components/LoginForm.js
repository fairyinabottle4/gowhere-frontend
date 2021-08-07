import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/currUserReducer'
import { Button, TextField } from '@material-ui/core'

const LoginForm = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')   

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(loginUser(username, password))
  }

  return(
    <form onSubmit={handleLogin} style={formStyle}>
      <h1 style={headerStyle}>Find inspiration for your next trip</h1>
      <h2 style={headerStyle}>Discover Machu Pichu and other UNESCO heritage sites</h2>
      <h3>Log in</h3>
      <div>
        <TextField   
          label="username"        
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}>
        </TextField>
      </div>
      <div>
        <TextField     
          label="password"  
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}>
        </TextField>
      </div>
      <Button variant="contained" color="primary" id="login-button" type="submit">
        login
      </Button>
    </form>      

  )
}

export default LoginForm

const formStyle = {
  backgroundColor: '#f5f5f5',
  opacity: 0.5,
}

const headerStyle = {
  fontFamily: 'Roboto'
}
