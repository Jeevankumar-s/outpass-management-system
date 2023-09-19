import {useLocation} from 'react-router-dom'
import AllProductsSection from '../AllProductsSection'
import PrimeDealsSection from '../PrimeDealsSection'
import Header from '../Header'

import './index.css'

const Outpassstatus = () => {
  const location = useLocation()
  const {username, user} = location.state || {} // Access the state object

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Header username={username} user={user} />
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center flex-column shadow">
            <h4 className="text-center">Outpass Status</h4>
          </div>
          <div className="container">
            <h1>total outpass status</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Outpassstatus
