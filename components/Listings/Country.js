import React, {useRef} from 'react'
import TogglableCountry from './TogglableCountry'
import Site from './Site'
import {
    TableCell,
  } from '@material-ui/core'
  


const Country = React.forwardRef((props, ref) => {
  const countryRef = useRef()
  console.log
  const combinedRef = [ref, countryRef]
  return (
    <div>
      <TableCell>
        {props.site.author}
      </TableCell>
      <TogglableCountry buttonLabel="view" level="country" ref={countryRef}>
        <Site site={props.site} user={props.user} ref={combinedRef} />
      </TogglableCountry>
    </div>
  )
})

export default Country