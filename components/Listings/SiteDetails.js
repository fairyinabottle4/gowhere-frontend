import React from 'react'
import PropTypes from 'prop-types'
import siteService from '../../services/sites'
import { useDispatch } from 'react-redux'
import { toggleStatus } from '../../reducers/sitesReducer'
import { setNotification } from '../../reducers/notifReducer'
import { Link } from '@material-ui/core'
import LikeButton from './LikeButton'
import VisitButton from './VisitButton'

const SiteDetails = ({site, user}) => {
  const dispatch = useDispatch()

  const updateSite = async (siteId, siteObject) => {
    try {
      const updatedSite = await siteService.update(siteId, siteObject)
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification("Could not update site"))
    }
  }


  return (
    <div className='site-details'>
      <Link href={site.url}>{site.url}</Link>
      <h2>
        <LikeButton user={user} site={site} updateSite={updateSite} />
        <VisitButton user={user} site={site} updateSite={updateSite} />
      </h2>
      <p>{site.description}</p>
      <img src={site.imageUrl} alt={"Image could not be loaded"} />
    </div>
  )
}

SiteDetails.propTypes = {
  site: PropTypes.object.isRequired,
}

export default SiteDetails
