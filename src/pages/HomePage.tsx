import { lazy, Suspense } from 'react'
import Hero from '../widgets/hero/Hero.tsx'

// Lazy загрузка компонентов ниже экрана (above the fold остается Hero)
const GeneralPricing = lazy(() => import('../widgets/pricing/GeneralPricing.tsx'))
const Gallery = lazy(() => import('../widgets/gallery/Gallery.tsx'))
const OrderFormContainer = lazy(() => import('../widgets/order-form/OrderFormContainer.tsx'))

// Красивый лоадер в стиле сайта
const SectionLoader = (): React.JSX.Element => (
  <div className="flex justify-center items-center py-20">
    <div className="flex items-center space-x-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      <span className="text-white text-lg tracking-wide">Загружаем...</span>
    </div>
  </div>
)

function Home(): React.JSX.Element {
  return (
    <main>
      {/* Hero загружается сразу - критично для первого экрана */}
      <Hero />
      
      {/* Pricing загружается по требованию */}
      <Suspense fallback={<SectionLoader />}>
        <GeneralPricing />
      </Suspense>
      
      {/* Галерея работ загружается по требованию */}
      <Suspense fallback={<SectionLoader />}>
        <Gallery />
      </Suspense>
      
      {/* Форма заказа загружается по требованию */}
      <Suspense fallback={<SectionLoader />}>
        <OrderFormContainer />
      </Suspense>
    </main>
  )
}

export default Home