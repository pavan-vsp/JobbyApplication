import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {RiSuitcaseFill} from 'react-icons/ri'

import Cookies from 'js-cookie'

import './index.css'

class HeaderPage extends Component {
  onClickLogout = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  getToHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    return (
      <div className="HeaderContainer">
        <li className="header-logo-container">
          <Link to="/" className="homeLink">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="header-logo-image"
              alt="website logo"
              onClick={this.getToHome}
            />
          </Link>
        </li>
        <li className="tabs-container">
          <Link to="/" className="link homeLink">
            <p className="header-link1">HOME</p>
          </Link>
          <Link to="/" className="Icon">
            <i ><AiFillHome size={30} color='limegreen' /></i>
          </Link>
          <Link to="/jobs" className="link jobsLink">
            <p className="header-link2">JOBS</p>
          </Link>
          <Link to="/jobs" className="Icon">
            <i className='jobs'><RiSuitcaseFill size={30} color='limegreen'/></i>
          </Link>
        </li>
        <li className="logout-btn-container" onClick={this.onClickLogout}>
          <button
            type="button"
            className="link logout-btn"
            onClick={this.onClickLogout}
          >
            Logout
          </button>
          <button
            type="button"
            className="Icon logoutIcon"
            onClick={this.onClickLogout}
          >
            <i className='logout'><FiLogOut size={30} color='brown'/></i>
          </button>
        </li>

      </div>
    )
  }
}

export default withRouter(HeaderPage)
