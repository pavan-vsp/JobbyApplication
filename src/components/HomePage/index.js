import {Component} from 'react'

import {Link} from 'react-router-dom'

import HeaderPage from '../HeaderPage'

import './index.css'

class HomePage extends Component {
  render() {
    return (
      <div className="home-container">
        <ul className="navBar">
          <HeaderPage />
        </ul>

        <div className="home-info-container">
          <h1 className="home-heading">Find the job that fits your life</h1>
          <p className="home-paragraph">
            Millions of people searching for jobs, salary information, company
            reviews. Find the job that fits your abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="find-jobs-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default HomePage
