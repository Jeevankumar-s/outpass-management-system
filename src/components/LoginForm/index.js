import {Component} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    user: null,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const {history} = this.props

    try {
      const res = await axios.post(
        'https://attractive-erin-ladybug.cyclic.cloud/login',
        {
          username,
          password,
        },
      )
      console.log(res)

      if (res.data.validation) {
        let user = ''
        if (res.data.userType === 'student') {
          user = 'student'
          history.replace('/', {username, user})
        } else if (res.data.userType === 'staff') {
          user = 'staff'
          history.replace('/history', {username, user})
        } else {
          user = 'hod'
          history.replace('/history', {username, user})
        }
        this.setState({showSubmitError: false})
        Cookies.set('jwt_token', res.data.jeevToken)
      } else {
        this.setState({showSubmitError: true, errorMsg: res.data.Error})
      }
    } catch (error) {
      console.error('Login error:', error.message)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dprxsgnqn/image/upload/v1694320298/vc9ukp7bdnvkhkvzkn3n.jpg"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="login-image-container">
            <img
              src="https://yt3.ggpht.com/a/AATXAJwORzAUuq_u1LIlDdiqGEJCGq9rSm8AphjwjQ=s900-c-k-c0xffffffff-no-rj-mo"
              className="login-website-logo-desktop-image"
              alt="website logo"
            />
          </div>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default withRouter(LoginForm)
