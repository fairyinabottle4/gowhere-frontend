import {
  BrowserRouter as Router, Link,
} from "react-router-dom"
  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faBuilding, faUser } from '@fortawesome/free-solid-svg-icons'


const Menu = () => {
  const topNavStyle = {
    backgroundColor: '#4ba3c7',
    border: '2px solid red',
    textAlign: 'center',
  }

  const linkStyle = {
    flex: 1,
    color: 'black',
    border: '2px solid blue',
    fontSize: 24,
    marginLeft: '1em',
    marginRight: '1em',
    fontFamily: 'Roboto',
    textDecoration: 'none',
    hover: {
      color: 'red'
    }
  }

  return (
    <div style={topNavStyle}>
      <Link to='/' style={linkStyle}>home <FontAwesomeIcon icon={faHome} /></Link>
      <Link to='/sites' style={linkStyle}>sites <FontAwesomeIcon icon={faBuilding} /></Link>
      <Link to='/search' style={linkStyle}>search   <FontAwesomeIcon icon={faSearch} /></Link>
      <Link to='/about' style={linkStyle}>about <FontAwesomeIcon icon={faUser} /></Link>
    </div>
  )
}    

  export default Menu