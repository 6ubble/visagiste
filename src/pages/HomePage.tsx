import { lazy, Suspense } from 'react'
import Hero from '../widgets/hero/Hero.tsx'

// Lazy загрузка компонентов ниже экрана (above the fold остается Hero)
const WhyMe = lazy(() => import('../widgets/whyme/WhyMe.tsx'))
const Training = lazy(() => import('../widgets/training/Training.tsx'))
const PriceList = lazy(() => import('../widgets/price/PriceList.tsx'))
const OrderForm = lazy(() => import('../widgets/order/OrderForm.tsx'))

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
      
      {/* Почему выбрать меня загружается по требованию */}
      <Suspense fallback={<SectionLoader />}>
        <WhyMe />
      </Suspense>

      {/* Прайс-лист загружается по требованию */}
      <Suspense fallback={<SectionLoader />}>
        <PriceList />
      </Suspense>

      {/* Обучение загружается по требованию */}
      <Suspense fallback={<SectionLoader />}>
        <Training />
      </Suspense>
      
      {/* Форма заказа загружается по требованию */}
      <Suspense fallback={<SectionLoader />}>
        <OrderForm />
      </Suspense>
    </main>
  )
}

export default Home