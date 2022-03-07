import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-js-loader'

import HeaderPage from '../HeaderPage'

import RenderFilters from '../RenderFilters'

import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsPage extends Component {
  state = {
    ListOfJobs: [],
    listOfEmpType: [],
    ProfileData: '',
    searchJob: '',
    minimumPackage: '',
    employmentType: '',
    apiStatusForJobsList: apiStatusConstants.initial,
    apiStatusForProfile: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.renderTheFetchedData()
    this.renderTheProfileData()
  }

  enterSearchInput = () => {
    this.renderTheFetchedData()
  }

  changeSearchInput = searchJob => {
    this.setState({searchJob}, this.renderTheResponseData)
  }

  onEnterSearchInput = () => {
    this.enterSearchInput()
  }

  onChangeSearchInput = event => {
    this.changeSearchInput(event.target.value)
  }

  onClickOnType = typeId => {
    const {listOfEmpType} = this.state
    listOfEmpType.push(typeId)
    localStorage.setItem('empType', listOfEmpType)
    const data = localStorage.getItem('empType')
    this.setState({employmentType: data}, this.renderTheFetchedData)
  }

  onRemoveTypeId = typeId => {
    const data = localStorage.getItem('empType')
    const array = data.split(',')
    array.pop()
    const strData = array.toString()
    const NewStrData = strData.replace(typeId, '')
    this.setState({employmentType: NewStrData}, this.renderTheFetchedData)
  }

  onClickOnRange = RangeId => {
    this.setState({minimumPackage: RangeId}, this.renderTheFetchedData)
  }


  renderTheResponseData = () => {
    const {ListOfJobs} = this.state
    const NoOfListItems = ListOfJobs.length > 0

    return NoOfListItems ? (
      <ul className='jobsListContainer'>
        {ListOfJobs.map(eachJob => (
          <JobItem key={eachJob.id} details={eachJob} />
        ))}
      </ul>
    ) : (
      <div className="NoData">
        <div className="NodataContainerImage">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="NoDataImage"
          />
        </div>
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  renderProfileDetails = () => {
    const {ProfileData} = this.state
    const {name, profileImageUrl, shortBio} = ProfileData
    return (
      <>
        <div className="card-container">
          <img src={profileImageUrl} alt="profile" className="profile" />
          <h1 className="person-name">{name}</h1>
          <p className="bio">{shortBio}</p>
        </div>
      </>
    )
  }

  renderTheProfileData = async () => {
    this.setState({
      apiStatusForProfile: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const ProfileData = await fetch('https://apis.ccbp.in/profile', options)

    if (ProfileData.ok) {
      const profileResponse = await ProfileData.json()
      const ProfileInfo = {
        name: profileResponse.profile_details.name,
        profileImageUrl: profileResponse.profile_details.profile_image_url,
        shortBio: profileResponse.profile_details.short_bio,
      }
      this.setState({
        ProfileData: ProfileInfo,
        apiStatusForProfile: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatusForProfile: apiStatusConstants.failure})
    }
  }

  renderTheFetchedData = async () => {
    const {searchJob, minimumPackage, employmentType} = this.state
    this.setState({
      apiStatusForJobsList: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?search=${searchJob}&minimum_package=${minimumPackage}&employment_type=${employmentType}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const fetchedData = await fetch(apiUrl, options)

    if (fetchedData.ok) {
      const response = await fetchedData.json()

      const mergedData = response.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        ListOfJobs: mergedData,
        apiStatusForJobsList: apiStatusConstants.success,
      })
    } else if (fetchedData.ok !== true) {
      this.setState({apiStatusForJobsList: apiStatusConstants.failure})
    }
  }

  LoadingCaseForProfile = () => (
    <div className="loader-container" testid="loader">
      <Loader type="box-rotate-x" bgColor={"#FFFFFF"} title={"box-rotate-x"} color={'#FFFFFF'} size={100} />
    </div>
  )

  LoadingCaseForJobs = () => (
    <div className="jobs-loader-container" testid="loader">
      <Loader type="box-rotate-x" bgColor={"#FFFFFF"} title={"box-rotate-x"} color={'#FFFFFF'} size={100} />
    </div>
  )

  retryBtnForProfile = () => {
    this.renderTheProfileData()
  }

  retryBtnForJobs = () => {
    this.renderTheFetchedData()
  }

  FailureCaseForJobs = () => (
    <div className="FailureCaseForJobsContainer">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
      </div>
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page that you are looking for </p>
      <button type="button" className="retryBtn" onClick={this.retryBtnForJobs}>
        Retry
      </button>
    </div>
  )

  FailureCaseForProfile = () => (
    <div className="FailureCaseForProfileContainer">
      <button
        type="button"
        className="retryBtn"
        onClick={this.retryBtnForProfile}
      >
        Retry
      </button>
    </div>
  )

  renderingAllJobsCases = () => {
    const {apiStatusForJobsList} = this.state
    switch (apiStatusForJobsList) {
      case apiStatusConstants.success:
        return this.renderTheResponseData()
      case apiStatusConstants.inProgress:
        return this.LoadingCaseForJobs()
      case apiStatusConstants.failure:
        return this.FailureCaseForJobs()
      default:
        return null
    }
  }

  renderAllProfileCases = () => {
    const {apiStatusForProfile} = this.state
    switch (apiStatusForProfile) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.inProgress:
        return this.LoadingCaseForProfile()
      case apiStatusConstants.failure:
        return this.FailureCaseForProfile()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-container">
        <div className="navBar">
          <HeaderPage />
        </div>
        
        <div className="filterAndJobs">
          <div className="filters-container">
            <div className="search-bar mobile-view">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onChangeSearchInput}
                />
                <button type="button" className="searchButton" testid="searchButton">
                  <BsSearch
                    className="search-icon"
                    testid="searchButton"
                    onClick={this.onEnterSearchInput}
                  />
                </button>
              </div>
            {this.renderAllProfileCases()}
            <div className="filters">
              <RenderFilters
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                onClickOnType={this.onClickOnType}
                onClickOnRange={this.onClickOnRange}
                onRemoveTypeId={this.onRemoveTypeId}
              />
            </div>
          </div>
          <div className="jobsList-container">
            <div className="jobs-list-container">
              <div className="search-bar medium-screen">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onChangeSearchInput}
                />
                <button type="button" className="searchButton" testid="searchButton">
                  <BsSearch
                    className="search-icon"
                    testid="searchButton"
                    onClick={this.onEnterSearchInput}
                  />
                </button>
              </div>
              {this.renderingAllJobsCases()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPage
