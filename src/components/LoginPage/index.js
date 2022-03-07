import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onFailureOfSubmit = response => {
    this.setState({errorMsg: response.error_msg, showErrorMsg: true})
  }

  onSuccessOfSubmit = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    history.replace('/')
  }

  onSubmitOfForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const Details = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(Details),
    }
    const FetchedData = await fetch(url, options)

    if (FetchedData.ok === true) {
      const response = await FetchedData.json()
      this.onSuccessOfSubmit(response.jwt_token)
    } else {
      const response = await FetchedData.json()
      this.onFailureOfSubmit(response)
    }
  }

  renderUsernameInputContainer = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label htmlFor="username">USERNAME</label>
        <input
          type="text"
          value={username}
          id="username"
          onChange={this.onChangeUsername}
          placeholder="username"
        />
      </div>
    )
  }

  renderPasswordInputContainer = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label htmlFor="password">PASSWORD</label>
        <input
          type="password"
          value={password}
          id="password"
          onChange={this.onChangePassword}
          placeholder="EnterPassword"
          autoComplete="off"
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg,password,username} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect  to="/" />
    }
    return (
      <div className="main">
        <div className="LoginPageContainer">
          <form className="FormContainer" onSubmit={this.onSubmitOfForm}>
            <div className="LoginPage-logoImage">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="loginPage-Logo-Image"
              />
            </div>
            <div className="input-container">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                value={username}
                id="username"
                onChange={this.onChangeUsername}
                placeholder="username"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                value={password}
                id="password"
                onChange={this.onChangePassword}
                placeholder="EnterPassword"
                autoComplete="off"
              />
            </div>

            <button type="submit" className="submit-btn">
              Login
            </button>
            {showErrorMsg ? <p className="error">{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginPage)