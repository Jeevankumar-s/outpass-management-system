import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

class index extends Component {
  state = {
    registerNo: '',
    name: '',
    email: '',
    year: '',
    department: '',
    reason: '',
    date: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeregisterNo = event => {
    this.setState({registerNo: event.target.value})
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

  onChangereason = event => {
    this.setState({reason: event.target.value})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {
      registerNo,
      name,
      email,
      year,
      department,
      reason,
      date,
      showSubmitError,
      errorMsg,
    } = this.state
    try {
      const res = await axios.post('http://localhost:3000/outpass', {
        registerNo,
        name,
        email,
        year,
        department,
        reason,
      })

      if (res.data.submission) {
        this.setState({showSubmitError: false, registerNo: ''})
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

  render() {
    const {
      registerNo,
      name,
      email,
      year,
      department,
      reason,
      date,
      showSubmitError,
      errorMsg,
    } = this.state
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
                    to="/history"
                    href="google.com"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-table"> </i>
                    <span className="ms-1 d-none d-sm-inline">History</span>
                  </Link>
                </li>

                {/* <li>
                        <a href="#" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Customers</span> </a>
                    </li> */}
              </ul>
              <hr />
              <div className="dropdown pb-4">
                <button type="submit" className="btn btn-primary">
                  Logout
                </button>
              </div>
              {/* <div className="dropdown pb-4">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                        <span className="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div> */}
            </div>
          </div>
          <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
              <h4>Outpass Management System</h4>
            </div>
            <form className="row p-3 g-3" onSubmit={this.onSubmit}>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Register No
                </label>
                <input
                  type="text"
                  value={registerNo}
                  onChange={this.onChangeregisterNo}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  value={name}
                  onChange={this.onChangename}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  id="inputPassword4"
                  onChange={this.onChangeemail}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputState" className="form-label">
                  Year
                </label>
                <select
                  id="inputState"
                  onChange={this.onChangeyear}
                  className="form-select"
                >
                  <option>V</option>
                  <option defaultValue>IV</option>
                  <option>III</option>
                  <option>II</option>
                  <option>I</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">
                  Department
                </label>
                <select
                  id="inputState"
                  onChange={this.onChangedepartment}
                  className="form-select"
                >
                  <option>EEE</option>
                  <option>ECE</option>
                  <option>CYS</option>
                  <option>MECH</option>
                  <option>AI</option>
                  <option>IOT</option>
                  <option>CSE</option>
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Reason
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  value={reason}
                  id="inputAddress"
                  placeholder="Enter Valid Reason"
                  onChange={this.onChangereason}
                  col="10"
                />
              </div>
              <div className="col-12 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Request Outpass
                </button>
              </div>
            </form>
            <p>
              {registerNo}
              {name}
              {email}
              {year}
              {department}
              {reason}
              {date}
            </p>
          </div>
        </div>
      </div>
    )
  }
}
export default index
