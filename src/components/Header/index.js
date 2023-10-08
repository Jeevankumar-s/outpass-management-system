import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  const {username, user} = props

  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div
        className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
        style={{position: 'sticky', top: '0', zIndex: '1000'}}
      >
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
          {user !== 'staff' && user !== 'hod' && (
            <li className="nav-item">
              <Link
                to={{
                  pathname: '/',
                  state: {
                    username,
                    user,
                  },
                }}
                className="nav-link align-middle px-0 text-white"
              >
                <i className="fs-4 bi-house"> </i>
                <span className="ms-1 d-none d-sm-inline">Home</span>
              </Link>
            </li>
          )}
          <li>
            <Link
              to={{
                pathname: '/outpassstatus',
                state: {
                  username,
                  user,
                },
              }}
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle text-white"
            >
              <i className="fs-5 bi-speedometer2"> </i>
              <span className="ms-1 d-none d-sm-inline">Outpass Status</span>
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
            onClick={onClickLogout}
            className="btn btn-primary"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
export default withRouter(Header)
