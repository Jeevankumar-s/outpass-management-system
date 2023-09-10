import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {Link} from 'react-router-dom'
import {Component} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

class index extends Component {
  constructor() {
    super()
    this.state = {
      outpassData: [],
      studentOutpassData: [],
    }
  }

  componentDidMount() {
    const {location: {state: {username, userType} = {}} = {}} = this.props
    console.log(`http://localhost:3000/history/${username}`)
    const apiUrl =
      userType === 'student'
        ? `http://localhost:3000/history/${username}`
        : 'http://localhost:3000/history'

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        if (userType === 'student') {
          this.setState({studentOutpassData: data})
        } else {
          this.setState({outpassData: data})
        }
      })
      .catch(error => console.error('Error fetching data:', error))
  }

  handleAccept = id => {
    alert(String(id))
  }

  handleDecline = id => {
    alert('Outpass Declined', String(id))

    // Implement the logic for declining an outpass here
    // You can make an API call to update the outpass status
  }

  render() {
    const {location} = this.props
    const {username, userType} = location.state || {}
    const {outpassData, studentOutpassData} = this.state
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
                <p>{username}</p>
                <p>{userType}</p>

                {/* <p>userType</p> */}
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
            <div className="p-2 d-flex justify-content-center flex-column shadow">
              <h4 className="text-center">History</h4>
              <div className="container">
                <>
                  {userType === 'staff' ? (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                      {outpassData.map(item => (
                        <div key={item.id} className="col mb-4">
                          <div className="card">
                            <div className="card-body">
                              <h3 className="card-title">{item.name}</h3>
                              <p className="card-text">
                                Registration No: {item.registerNo}
                              </p>
                              <p className="card-text">Email: {item.email}</p>
                              <p className="card-text">
                                Department: {item.department}
                              </p>
                              <p className="card-text">Year: {item.year}</p>
                              <p className="card-text">Reason: {item.reason}</p>
                              <button
                                onClick={() => this.handleAccept(item.id)}
                                className="btn btn-success mr-2"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => this.handleDecline(item.id)}
                                className="btn btn-danger m-3"
                              >
                                Decline
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                      {studentOutpassData.map(item => (
                        <div key={item.id} className="col mb-4">
                          <div className="card">
                            <div className="card-body">
                              <h3 className="card-title">{item.name}</h3>
                              <p className="card-text">
                                Registration No: {item.registerNo}
                              </p>
                              <p className="card-text">Email: {item.email}</p>
                              <p className="card-text">
                                Department: {item.department}
                              </p>
                              <p className="card-text">Year: {item.year}</p>
                              <p className="card-text">Reason: {item.reason}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default index
