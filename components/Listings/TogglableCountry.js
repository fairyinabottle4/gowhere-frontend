import React, { useState, useImperativeHandle, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const TogglableCountry = React.forwardRef((props, ref) => {
    
  const [visible, setVisible] = useState(false)
//   const [action, setAction] = useState(false)

//   useEffect(() => {
//       toggleVisibility()
//   },[action])

  console.log(props.level)
  console.log(visible)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const setVisTrueCountry = () => {
    setAction(!action)
    setVisible(true)
  }

  useImperativeHandle(ref, () => {
    return {
      setVisTrueCountry
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button size='small' variant='contained' color='primary' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button size='small' variant='contained' color='secondary' onClick={toggleVisibility}>{props.buttonLabel === "view" ? "hide" : "cancel"}
        </Button>
      </div>
    </div>
  )
})

TogglableCountry.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

TogglableCountry.displayName = 'Togglable'

export default TogglableCountry
