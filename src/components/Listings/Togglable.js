import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
    
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={container}>
      <div style={showWhenVisible}>
        {props.children}
        <Button size='small' variant='contained' color='secondary' 
                onClick={toggleVisibility}>{props.buttonLabel === `view ${props.region}` ? `hide ${props.region}` : "cancel"}
        </Button>
      </div>
      <div style={hideWhenVisible}>
        <Button size='small' variant='contained' color='primary' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable


const container = {
  backgroundColor: '#f5f5f5'
}
