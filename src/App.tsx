import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import WhyMe from './components/WhyMe/WhyMe'
import PriceList from './components/PriceList/PriceList'
import Training from './components/Training/Training'
import OrderForm from './components/OrderForm/OrderForm'

function App(): React.JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyMe />
        <PriceList />
        <Training />
        <OrderForm />
      </main>
    </>
  )
}

export default App