import {Component} from 'react'

import {IoBagCheckSharp} from 'react-icons/io5'

import {BsFillStarFill} from 'react-icons/bs'

import {GoLocation} from 'react-icons/go'

import {Link} from 'react-router-dom'

import './index.css'

class JobItem extends Component {
  render() {
    const {details} = this.props
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      id,
    } = details
    return (
      <li className="jobItem-list-container">
        <Link to={`jobs/${id}`} className="Link-Component">
          <div className="image-details-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="jobItem-image"
            />
            <div className="company-rating-and-name">
              <h1 className="company-name">{title}</h1>
              <p className="company-rating">
                <BsFillStarFill className="icon star-icon" /> {rating}
              </p>
            </div>
          </div>

          <div className="location-job-type-container">
            <div className="location-type-container">
              <div className="location">
                <GoLocation className="icon location-icon" />
                <p>{location}</p>
              </div>
              <p className="type-container">
                <IoBagCheckSharp className="icon bag-icon" />
                {employmentType}
              </p>
            </div>
            <div className="package">{parseInt(packagePerAnnum) % 100} LPA</div>
          </div>
          <hr className="hr" />
          <div>
            <h2 className="description">Description</h2>
            <p className="description-p">{jobDescription}</p>
          </div>
        </Link>
      </li>
    )
  }
}

export default JobItem
