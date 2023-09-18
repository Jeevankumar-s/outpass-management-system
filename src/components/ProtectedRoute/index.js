import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = ({component: Component, username, user, ...rest}) => {
  const token = Cookie.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <Route
      {...rest}
      render={props => <Component {...props} username={username} user={user} />}
    />
  )
}

export default ProtectedRoute
