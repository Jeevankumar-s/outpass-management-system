import AllProductsSection from '../AllProductsSection'
import PrimeDealsSection from '../PrimeDealsSection'

import Header from '../Header'

import './index.css'

const Outpassstatus = () => (
  <>
    <Header />
    <div className="product-sections">
      <PrimeDealsSection />
      <AllProductsSection />
    </div>
  </>
)

export default Outpassstatus
