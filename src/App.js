import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Outpassstatus from './components/Products'
import History from './components/History'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        username="20104035"
        user="student"
      />
      <ProtectedRoute
        exact
        path="/outpassstatus"
        component={Outpassstatus}
        username="20104035"
        user="student"
      />
      <ProtectedRoute
        exact
        path="/history"
        component={History}
        username="20104035"
        user="student"
      />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
