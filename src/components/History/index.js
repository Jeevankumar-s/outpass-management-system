import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Header from '../Header'

class index extends Component {
  constructor() {
    super()
    this.state = {
      outpassData: [],
      studentOutpassData: [],
      button: null,
      loading: false,
    }
  }

  componentDidMount() {
    const {location: {state: {username, user} = {}} = {}} = this.props

    const apiUrl =
      user === 'student'
        ? `https://attractive-erin-ladybug.cyclic.cloud/history/${username}`
        : 'https://attractive-erin-ladybug.cyclic.cloud/history'

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        if (user === 'student') {
          this.setState({studentOutpassData: data})
        } else {
          this.setState({outpassData: data})
        }
      })
      .catch(error => console.error('Error fetching data:', error))
  }

  handleStaffAccept = id => {
    axios
      .post(
        `https://attractive-erin-ladybug.cyclic.cloud/outpass/${id}/staff-approve`,
      )
      .then(response => {
        if (response.data.success) {
          // Update the UI to reflect the accepted outpass
          this.updateOutpassStatus(id, 'Staff Approved')
          alert(`Accepted outpass with ID: ${id}`)
        } else {
          alert(`Failed to accept outpass with ID: ${id}`)
        }
      })
      .catch(error => {
        console.error('Error accepting outpass:', error)
        alert(`An error occurred while accepting outpass with ID: ${id}`)
      })
  }

  handleStaffDecline = id => {
    axios
      .post(
        `https://attractive-erin-ladybug.cyclic.cloud/outpass/${id}/staff-decline`,
      )
      .then(response => {
        if (response.data.success) {
          // Update the UI to reflect the accepted outpass
          this.updateOutpassStatus(id, 'Staff Declined')
          alert(`Declined outpass with ID: ${id}`)
        } else {
          alert(`Failed to accept outpass with ID: ${id}`)
        }
      })
      .catch(error => {
        console.error('Error accepting outpass:', error)
        alert(`An error occurred while accepting outpass with ID: ${id}`)
      })
  }

  // hod accept

  handleAccept = id => {
    this.setState({loading: true})
    axios
      .post(`https://attractive-erin-ladybug.cyclic.cloud/outpass/${id}/accept`)
      .then(response => {
        if (response.data.success) {
          // Update the UI to reflect the accepted outpass
          this.updateOutpassStatus(id, 'HOD Accepted')
          this.setState({loading: false})
          alert(`Accepted outpass with ID: ${id}`)
        } else {
          alert(`Failed to accept outpass with ID: ${id}`)
        }
      })
      .catch(error => {
        console.error('Error accepting outpass:', error)
        alert(`An error occurred while accepting outpass with ID: ${id}`)
      })
  }

  // hod decline

  handleDecline = id => {
    // Show a confirmation dialog to the staff member
    const confirmDecline = window.confirm(
      'Are you sure you want to decline this outpass?',
    )

    if (confirmDecline) {
      axios
        .post(
          `https://attractive-erin-ladybug.cyclic.cloud/outpass/${id}/decline`,
        )
        .then(response => {
          if (response.data.success) {
            // Update the UI to reflect the declined outpass
            this.updateOutpassStatus(id, 'HOD Declined')

            // Send a rejection email

            alert(`Declined outpass with ID: ${id}`)
          } else {
            alert(`Failed to decline outpass with ID: ${id}`)
          }
        })
        .catch(error => {
          console.error('Error declining outpass:', error)
          alert(`An error occurred while declining outpass with ID: ${id}`)
        })
    }
  }

  updateOutpassStatus(id, status) {
    // Update the component's state to reflect the accepted or declined outpass
    const {location: {state: {username, user} = {}} = {}} = this.props

    if (user === 'staff' || 'hod') {
      const {outpassData} = this.state

      const updatedOutpassData = outpassData.map(item => {
        if (item.id === id) {
          return {...item, status}
        }
        return item
      })
      this.setState({outpassData: updatedOutpassData})
    } else {
      const {studentOutpassData} = this.state
      const updatedStudentOutpassData = studentOutpassData.map(item => {
        if (item.id === id) {
          return {...item, status}
        }
        return item
      })
      this.setState(prevState => ({
        studentOutpassData: updatedStudentOutpassData,
      }))
    }
  }

  render() {
    const {location} = this.props
    const {username, user} = location.state || {}
    const {outpassData, studentOutpassData, loading} = this.state

    return (
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Header username={username} user={user} />
          {loading ? (
            <div className="col p-0 m-0 d-flex align-items-center justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="col p-0 m-0">
              <div className="p-2 d-flex justify-content-center flex-column shadow">
                <h4 className="text-center">History</h4>
                <div className="container">
                  <>
                    {user === 'staff' || user === 'hod' ? (
                      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        {outpassData.map(item => (
                          <div key={item.id} className="col mb-4">
                            <div className="card">
                              <div className="card-body">
                                <h3 className="card-title">{item.name}</h3>
                                <p className="card-text">
                                  Register No: {item.registernumber}
                                </p>
                                <p className="card-text">Email: {item.email}</p>
                                <p className="card-text">
                                  Department: {item.department}
                                </p>
                                <p className="card-text">Year: {item.year}</p>
                                <p className="card-text">
                                  Semester: {item.semester}
                                </p>
                                <p className="card-text">
                                  Requested Time: {item.current_datetime}
                                </p>
                                <p className="card-text">
                                  Reason: {item.reason}
                                </p>
                                <p className="card-text">
                                  Status: {item.status}
                                </p>
                                {user === 'staff' && (
                                  // Render staff-specific buttons and assign staff-specific functions
                                  <>
                                    <button
                                      onClick={() =>
                                        this.handleStaffAccept(item.id)
                                      }
                                      className="btn btn-success mr-2"
                                    >
                                      Accept
                                    </button>
                                    <button
                                      onClick={() =>
                                        this.handleStaffDecline(item.id)
                                      }
                                      className="btn btn-danger m-3"
                                    >
                                      Decline
                                    </button>
                                  </>
                                )}
                                {user === 'hod' && (
                                  // Render HOD-specific buttons and assign HOD-specific functions
                                  <>
                                    <button
                                      onClick={() => this.handleAccept(item.id)}
                                      className="btn btn-success mr-2"
                                    >
                                      Accept
                                    </button>
                                    <button
                                      onClick={() =>
                                        this.handleDecline(item.id)
                                      }
                                      className="btn btn-danger m-3"
                                    >
                                      Decline
                                    </button>
                                  </>
                                )}
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
                                  Register No: {item.registernumber}
                                </p>
                                <p className="card-text">Email: {item.email}</p>
                                <p className="card-text">
                                  Department: {item.department}
                                </p>
                                <p className="card-text">Year: {item.year}</p>
                                <p className="card-text">
                                  Semester: {item.semester}
                                </p>
                                <p className="card-text">
                                  Requested Time: {item.current_datetime}
                                </p>
                                <p className="card-text">
                                  Reason: {item.reason}
                                </p>
                                <p className="card-text">
                                  Status: {item.status}
                                </p>
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
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(index)
