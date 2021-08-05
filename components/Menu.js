import {
    BrowserRouter as Router, Link,
  } from "react-router-dom"
  



const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link to='/' style={padding}>home</Link>
        <Link to='/sites' style={padding}>sites</Link>
        <Link to='/search' style={padding}>search</Link>
        <Link to='/about' style={padding}>about</Link>
      </div>
    )
  }    

  export default Menu