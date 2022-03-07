import {IoBagCheckSharp} from 'react-icons/io5'

import {BsFillStarFill} from 'react-icons/bs'

import {GoLocation} from 'react-icons/go'

import './index.css'

const SimilarJobs = props => {
  const {SimilarJobsDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = SimilarJobsDetails
  return (
    <li className="similarJobsListItem">
      <div className="similarJobsContainer">
        <div className="imageContainer">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similarJobImage"
          />
          <div className="nameRatingContainer">
            <h1>{title}</h1>
            <div className="ratingContainer">
              <BsFillStarFill className="star-icon" />
              <p className="ratingParagraph">{rating}</p>
            </div>
          </div>
        </div>
        <div className="similarJobsDescription">
          <h1 className="similarJobsDescriptionHeading">Description</h1>
          <p>{jobDescription}</p>
        </div>
        <div className="loactionContainer">
          <div className="location">
            <GoLocation />
            <p>{location}</p>
          </div>
          <div className="jobType">
            <IoBagCheckSharp />
            <p className="jobTypeIcon">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
