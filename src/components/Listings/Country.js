import React, {useRef} from 'react'
import TogglableCountry from './TogglableCountry'
import Site from './Site'  

const Country = React.forwardRef((props, ref) => {
  const countryRef = useRef()
  const combinedRef = [ref, countryRef]
  return (
    <div>
      <h1 style={countryName}>
        {props.country}
      </h1>
      <TogglableCountry 
        buttonLabel={`view ${props.country}`} level="country" 
        ref={countryRef} country={props.country}>
        {props.sites.map(s => <Site site={s} user={props.user} ref={combinedRef} /> )}
      </TogglableCountry>
    </div>
  )
})

export default Country


const countryName = {
  fontFamily: "Roboto",
  backgroundColor: "#f5f5f5"
}