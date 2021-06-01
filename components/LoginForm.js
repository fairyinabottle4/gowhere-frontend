import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/currUserReducer'


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
    <form onSubmit={handleLogin}>
    <h2>log in to application</h2>
    <div>
      username
        <input
        type="text"
        id="username"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        id="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button id="login-button" type="submit">login</button>
  </form>      

  )
}

export default LoginForm
