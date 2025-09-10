import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import WhyMe from './components/WhyMe/WhyMe'
import PriceList from './components/PriceList/PriceList'
import Training from './components/Training/Training'
import OrderForm from './components/OrderForm/OrderFormContainer'
import Map from './components/Map/Map'

function App(): React.JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyMe />
        <PriceList />
        <Training />
        <Map />
        <OrderForm />
      </main>
    </>
  )
}

export default App