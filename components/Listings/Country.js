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
      <h1 style={countryName}>
        {props.site.country}
      </h1>
      <TogglableCountry 
        buttonLabel={`view ${props.site.country}`} level="country" 
        ref={countryRef} country={props.site.country}>
        <Site site={props.site} user={props.user} ref={combinedRef} />
      </TogglableCountry>
    </div>
  )
})

export default Country


const countryName = {
  fontFamily: "Roboto",
  backgroundColor: "#f5f5f5"
}