import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import nodemailer from 'nodemailer'
import Header from '../Header'

class index extends Component {
  transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'paavaioutpass@gmail.com', // Replace with your actual email address
      pass: 'paavaioutpass123', // Replace with your email password
    },
  })

  constructor() {
    super()
    this.state = {
      outpassData: [],
      studentOutpassData: [],
    }
  }

  componentDidMount() {
    const {location: {state: {username, user} = {}} = {}} = this.props
    console.log(username, user)

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

  handleAccept = id => {
    // Make an API call to accept the outpass with the given ID
    axios
      .get(`http://localhost:3000/outpass/${id}/accept`)
      .then(response => {
        if (response.data.success) {
          const mainID = 'MAIN-123456-JohnDoe-1631234567890' // Replace with the generated main ID
          const studentEmail = 'jeevenkumar2003@gmail.com' // Replace with the student's email

          // Send an email
          this.sendEmail(studentEmail)

          alert(`Accepted outpass with ID: ${id}`)
          // You may want to update your state to reflect the accepted outpass
        } else {
          // Handle the case where the API request was successful but the outpass was not accepted
          alert(`Failed to accept outpass with ID: ${id}`)
        }
      })
      .catch(error => {
        // Handle any errors that occur during the API request
        console.error('Error accepting outpass:', error)
        alert(`An error occurred while accepting outpass with ID: ${id}`)
      })
  }

  sendEmail = async (toEmail, subject, text) => {
    try {
      // Send email
      const info = await this.transporter.sendMail({
        from: 'paavaioutpass@gmail.com', // Replace with your actual email address
        to: 'pjeevs23@gmail.com',
        subject: 'Outpass Approved',
        text: 'Your outpass has been approved',
      })
      alert('email sent successfully')
      console.log('Email sent:', info.response)
    } catch (error) {
      alert('cant send email')
      console.error('Email sending error:', error)
    }
  }

  handleDecline = id => {
    alert('Outpass Declined', String(id))

    // Implement the logic for declining an outpass here
    // You can make an API call to update the outpass status
  }

  render() {
    const {location} = this.props
    const {username, user} = location.state || {}
    const {outpassData, studentOutpassData} = this.state
    return (
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Header username={username} user={user} />
          <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center flex-column shadow">
              <h4 className="text-center">History</h4>
              <div className="container">
                <>
                  {user === 'staff' ? (
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
                                Requested Time: {item.current_datetime}
                              </p>
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
                                Register No: {item.registernumber}
                              </p>
                              <p className="card-text">Email: {item.email}</p>
                              <p className="card-text">
                                Department: {item.department}
                              </p>
                              <p className="card-text">Year: {item.year}</p>
                              <p className="card-text">
                                Requested Time: {item.current_datetime}
                              </p>

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
export default withRouter(index)
