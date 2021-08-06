import React, {useRef} from 'react'
import TogglableCountry from './TogglableCountry'
import Site from './Site'
import {
    TableCell,
  } from '@material-ui/core'
  


const Country = React.forwardRef((props, ref) => {
  const countryRef = useRef()
  const combinedRef = [ref, countryRef]
  return (
    <div>
      <h1>
        {props.site.author}
      </h1>
      <TogglableCountry 
        buttonLabel={`view ${props.site.author}`} level="country" 
        ref={countryRef} country={props.site.author}>
        <Site site={props.site} user={props.user} ref={combinedRef} />
      </TogglableCountry>
    </div>
  )
})

export default Country