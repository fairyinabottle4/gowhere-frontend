import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const TogglableSite = React.forwardRef((props, ref) => {
    
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { 
    display: visible ? '' : 'none',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button size='small' variant='contained' color='primary' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button size='small' variant='contained' color='secondary' 
          onClick={toggleVisibility}>{props.buttonLabel === "view" ? "hide" : `hide ${props.title}`}
        </Button>
      </div>
    </div>
  )
})

TogglableSite.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

TogglableSite.displayName = 'Togglable'

export default TogglableSite
