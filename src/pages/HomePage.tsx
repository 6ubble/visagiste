import Hero from '../widgets/hero/Hero.tsx'
import GeneralPricing from '../widgets/pricing/GeneralPricing.tsx'
import OrderFormContainer from '../widgets/order-form/OrderFormContainer.tsx'

function Home(): React.JSX.Element {
  return (
    <main>
      <Hero />
      <GeneralPricing />
      <OrderFormContainer />
    </main>
  )
}

export default Home
