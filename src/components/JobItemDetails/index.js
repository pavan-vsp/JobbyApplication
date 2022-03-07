import Cookies from 'js-cookie'

import {Component} from 'react'

import Loader from 'react-js-loader'

import {IoBagCheckSharp} from 'react-icons/io5'

import {BsFillStarFill} from 'react-icons/bs'

import {GoLocation} from 'react-icons/go'

import SimilarJobs from '../SimilarJobs'

import SkillList from '../SkillList'

import HeaderPage from '../HeaderPage'

import './index.css'

const apiStatusConstantsForJobItem = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    itemDetails: '',
    lifeAtCompany: '',
    similarJobsList: [],
    skillList: [],
    apiStatus: apiStatusConstantsForJobItem.initial,
  }

  componentDidMount() {
    this.renderItemDetails()
  }

  renderItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstantsForJobItem.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken} `,
      },
    }

    const fetcheddata = await fetch(url, options)
    if (fetcheddata.ok) {
      const response = await fetcheddata.json()
      const itemDetailsObject = {
        title: response.job_details.title,
        companyLogoUrl: response.job_details.company_logo_url,
        companyWebsiteUrl: response.job_details.company_website_url,
        id: response.job_details.id,
        employmentType: response.job_details.employment_type,
        jobDescription: response.job_details.job_description,
        location: response.job_details.location,
        rating: response.job_details.rating,
        packagePerAnnum: response.job_details.package_per_annum,
      }

      const skillObjectList = await response.job_details.skills.map(
        eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        }),
      )

      const lifeAtCompanyObject = {
        description: response.job_details.life_at_company.description,
        imageUrl: response.job_details.life_at_company.image_url,
      }

      const similarJobsObject = await response.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        id: eachJob.id,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        itemDetails: itemDetailsObject,
        skillList: [...skillObjectList],
        lifeAtCompany: lifeAtCompanyObject,
        similarJobsList: [...similarJobsObject],
        apiStatus: apiStatusConstantsForJobItem.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstantsForJobItem.failure})
    }
  }

  renderTheDescriptionDetails = () => {
    const {itemDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      employmentType,
      jobDescription,
      rating,
      location,
      packagePerAnnum,
    } = itemDetails

    return (
      <div className="jobDescriptionDetailsDetailsContainer">
        <div className="image-details-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="jobItem-image"
          />
          <div className="company-rating-and-name">
            <h1 className="company-name">{title}</h1>
            <div className="company-rating">
              <BsFillStarFill className="icon star-icon" />
              <p className="ratingParagraph">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-job-type-container">
          <div className="location-type-container">
            <p className="location">
              <GoLocation className="icon location-icon" />
              {location}
            </p>
            <div className="type-container">
              <IoBagCheckSharp className="icon bag-icon" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p className="package">{parseInt(packagePerAnnum) % 100} LPA</p>
        </div>
        <hr className="hr" />
        <div>
          <div className="linkAndDescription">
            <h2 className="description">Description</h2>
            <span>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </a>
            </span>
          </div>

          <p className="description-p">{jobDescription}</p>
        </div>
      </div>
    )
  }

  renderSimilarJobsDetails = () => {
    const {similarJobsList} = this.state
    return (
      <ul className="similar-ul">
        {similarJobsList.map(eachJob => (
          <SimilarJobs SimilarJobsDetails={eachJob} />
        ))}
      </ul>
    )
  }

  renderLifeAtCompanyDetails = () => {
    const {lifeAtCompany} = this.state
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="lifeAtCompanyContentAndImageContainer">
        <div className="lifeAtCompanyContent">
          <p>{description}</p>
        </div>
        <div className="lifeAtCompanyImageContainer">
          <img
            src={imageUrl}
            className="lifeAtCompanyImage"
            alt="Life at Company"
          />
        </div>
      </div>
    )
  }

  rerenderJobDetailsApi = () => {
    this.renderItemDetails()
  }

  renderOnFailure = () => (
    <div className="jobItemOnFailure">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className='jobsSearchFailureImage'
        />
      </div>
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retryBtn"
        onClick={this.rerenderJobDetailsApi}
      >
        Retry
      </button>
    </div>
  )

  LoadingCaseForJobs = () => (
    <div className="jobs-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessData = () => {
    const {skillList} = this.state
    return (
      <div className="DetailsPart">
        <div className="jobDetailsContainer">
          <div className="DeatailsContainer">
            {this.renderTheDescriptionDetails()}
          </div>
          <div className="skillListContainer">
            <h1 className="skillsHeading">Skills</h1>
            <ul className="skill-ul">
              {skillList.map(eachSkill => (
                <SkillList skillDetails={eachSkill} />
              ))}
            </ul>
          </div>
          <div className="lifeAtCompanyContainer">
            <h1 className="skillsHeading">Life at Company</h1>
            {this.renderLifeAtCompanyDetails()}
          </div>
        </div>

        <div className="similarJobsContainer">
          <h1 className="similarJobsHeading">Similar Jobs</h1>
          {this.renderSimilarJobsDetails()}
        </div>
      </div>
    )
  }



  renderAllCasesOfJobId = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstantsForJobItem.success:
        return this.renderSuccessData()
      case apiStatusConstantsForJobItem.inProgress:
        return this.LoadingCaseForJobs()
      case apiStatusConstantsForJobItem.failure:
        return this.renderOnFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobDetailsMainContainer">
        <div className="jobDetailsHeaderContainer">
          <HeaderPage className="jobDetailsHeaderContent" />
        </div>
        <div className="DetailsPart">{this.renderAllCasesOfJobId()}</div>
      </div>
    )
  }
}
export default JobItemDetails
