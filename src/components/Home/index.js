import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {Link, Outlet} from 'react-router-dom'
import {Component} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

class index extends Component {
  state = {
    registernumber: '',
    name: '',
    email: '',
    year: '',
    department: '',
    reason: '',
    semester: '',
    showSubmitError: false,
    errorMsg: '',
  }

  componentDidMount() {
    const {location} = this.props
    const {state} = location

    if (state && state.userDetails) {
      const {userDetails} = state
      const {username, user} = userDetails
      // Now you have access to username and userType
      console.log('Username:', username)
      console.log('User Type:', user)
    }
  }

  onChangeregisterNo = event => {
    this.setState({registernumber: event.target.value})
  }

  onChangename = event => {
    this.setState({name: event.target.value})
  }

  onChangeemail = event => {
    this.setState({email: event.target.value})
  }

  onChangeyear = event => {
    this.setState({year: event.target.value})
  }

  onChangedepartment = event => {
    this.setState({department: event.target.value})
  }

  onChangeSem = event => {
    this.setState({semester: event.target.value})
  }

  onChangereason = event => {
    this.setState({reason: event.target.value})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {
      registernumber,
      name,
      email,
      year,
      department,
      reason,
      semester,
      showSubmitError,
      errorMsg,
    } = this.state
    try {
      const res = await axios.post(
        'https://attractive-erin-ladybug.cyclic.cloud/outpass',
        {
          name,
          registernumber,
          email,
          year,
          department,
          semester,
          reason,
        },
      )

      if (res.data.submission) {
        this.setState({
          showSubmitError: false,
          registernumber: '',
          name: '',
          email: '',
          reason: '',
        })
        alert('Outpass Submitted Successfully')
        // Use this.props.history.push to navigate to the dashboard
      } else {
        this.setState({showSubmitError: true, errorMsg: res.data.Error})
        alert('cant submit outpass')
      }
    } catch (error) {
      console.error('Login error:', error.message)
      alert('server error')
    }
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {
      name,
      registernumber,
      email,
      year,
      department,
      semester,
      reason,
      showSubmitError,
      errorMsg,
    } = this.state
    // const {location} = this.props
    // const {state} = location
    // const userDetails = state && state.userDetails
    // const username = userDetails ? userDetails.username : ''
    // const user = userDetails ? userDetails.user : ''
    const {location} = this.props
    const {username, user} = location.state || {}
    console.log('Location:', location)
    // console.log(username, user)

    return (
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a
                href="/"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span className="fs-5 d-none d-sm-inline">Menu</span>
              </a>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link align-middle px-0 text-white"
                  >
                    <i className="fs-4 bi-house"> </i>
                    <span className="ms-1 d-none d-sm-inline">Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/outpassstatus"
                    data-bs-toggle="collapse"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-5 bi-speedometer2"> </i>
                    <span className="ms-1 d-none d-sm-inline">
                      Outpass Status
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: '/history',
                      state: {
                        username,
                        user,
                      },
                    }}
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-table"> </i>
                    <span className="ms-1 d-none d-sm-inline">History</span>
                  </Link>
                </li>
              </ul>
              <hr />
              <p>{username}</p>
              <p>{user}</p>
              <div className="dropdown pb-4">
                <button
                  type="submit"
                  onClick={this.onClickLogout}
                  className="btn btn-primary"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
              <h4>Outpass Management System</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default index
