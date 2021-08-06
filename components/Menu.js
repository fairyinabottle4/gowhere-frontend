import { green } from "@material-ui/core/colors"
import {
    BrowserRouter as Router, Link,
  } from "react-router-dom"
  



const Menu = () => {
  const linkStyle = {
    flex: 1,
    margin: '5em',
    color: 'black',
    border: '2px solid blue',
    textAlign: 'center',
    fontSize: 24
  }

  const topNavStyle = {
    backgroundColor: '#4ba3c7',
    border: '2px solid red',
    textAlign: 'center'
  }
  return (
    <div style={topNavStyle}>
      <Link to='/' style={linkStyle}>home</Link>
      <Link to='/sites' style={linkStyle}>sites</Link>
      <Link to='/search' style={linkStyle}>search</Link>
      <Link to='/about' style={linkStyle}>about</Link>
    </div>
  )
}    

  export default Menu