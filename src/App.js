import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'

import Outpassstatus from './components/Products'
import History from './components/History'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import {UserProvider} from './components/userFile/UserContext'
import './App.css'

const App = () => (
  <BrowserRouter>
    <UserProvider>
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/outpassstatus" component={Outpassstatus} />
        <ProtectedRoute exact path="/history" component={History} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </UserProvider>
  </BrowserRouter>
)

export default App
