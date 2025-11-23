import Header from '../widgets/header/Header'
import Hero from '../widgets/hero/Hero'
import WhyMe from '../widgets/why-me/WhyMe'
import PriceList from '../features/view-price/ui/PriceList'
import Training from '../widgets/training/Training'
import Map from '../widgets/map/Map'

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
      </main>
    </>
  )
}

export default App