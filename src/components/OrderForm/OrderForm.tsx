import { SERVICE_TYPES } from './constants.ts'
import { useFormContext } from 'react-hook-form'
import type { OrderFormSchema } from './schema'
import SuccessModal from './SuccessModal'

interface OrderFormProps {
  isSubmitting: boolean
  submitStatus: {
    type: 'success' | 'error' | null
    message: string
  }
  onSubmit: (data: OrderFormSchema) => void
  onCloseSuccess: () => void
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function OrderForm({ isSubmitting, submitStatus, onSubmit, onCloseSuccess, onPhoneChange }: OrderFormProps): React.JSX.Element {
  const { register, handleSubmit, formState: { errors }, watch } = useFormContext<OrderFormSchema>()
  const watchedServiceType = watch('serviceType')

  return (
    <section id="order" className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Записаться на услугу
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Заполните форму и я свяжусь с вами для уточнения деталей
          </p>
        </div>

        {/* Форма */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-6 md:p-8 border-2 border-gray-600 max-w-4xl mx-auto">
          {/* Статус отправки - только для ошибок */}
          {submitStatus.type === 'error' && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-400/30 text-red-200">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-3 bg-red-400 flex-shrink-0"></div>
                <span className="font-medium text-sm">{submitStatus.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Имя и телефон */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl focus:outline-none transition-all duration-200 text-white placeholder-gray-400 ${
                    errors.name 
                      ? 'border-red-400 focus:border-red-300' 
                      : 'border-white/20 focus:border-yellow-400'
                  }`}
                  placeholder="Введите ваше имя"
                  autoComplete="given-name"
                />
                {errors.name && (
                  <div className="mt-2 text-xs text-red-300 flex items-center">
                    <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                    {errors.name.message}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                  Номер телефона *
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  onChange={onPhoneChange}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl focus:outline-none transition-all duration-200 text-white placeholder-gray-400 ${
                    errors.phone 
                      ? 'border-red-400 focus:border-red-300' 
                      : 'border-white/20 focus:border-yellow-400'
                  }`}
                  placeholder="+7 (999) 123-45-67"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <div className="mt-2 text-xs text-red-300 flex items-center">
                    <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                    {errors.phone.message}
                  </div>
                )}
              </div>
            </div>

            {/* Тип услуги */}
            <div>
              <label className="block text-sm font-semibold text-white mb-4">
                Выберите услугу *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {SERVICE_TYPES.map((service) => (
                  <label 
                    key={service.id}
                    className={`flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all duration-200 min-h-[60px] ${
                      watchedServiceType === service.id 
                        ? 'border-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/20' 
                        : 'border-white/20 hover:border-yellow-400/50 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      {...register('serviceType')}
                      value={service.id}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-semibold text-white text-sm leading-tight">{service.name}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.serviceType && (
                <div className="mt-2 text-xs text-red-300 flex items-center">
                  <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                  {errors.serviceType.message}
                </div>
              )}
            </div>

            {/* Предпочтительная дата */}
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-semibold text-white mb-2">
                Предпочтительная дата *
              </label>
              <input
                type="date"
                id="preferredDate"
                {...register('preferredDate')}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl focus:outline-none transition-all duration-200 text-white ${
                  errors.preferredDate 
                    ? 'border-red-400 focus:border-red-300' 
                    : 'border-white/20 focus:border-yellow-400'
                }`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.preferredDate && (
                <div className="mt-2 text-xs text-red-300 flex items-center">
                  <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                  {errors.preferredDate.message}
                </div>
              )}
            </div>

            {/* Дополнительные пожелания */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">
                Дополнительные пожелания
              </label>
              <textarea
                id="description"
                rows={4}
                {...register('description')}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl focus:outline-none resize-none transition-all duration-200 text-white placeholder-gray-400 ${
                  errors.description 
                    ? 'border-red-400 focus:border-red-300' 
                    : 'border-white/20 focus:border-yellow-400'
                }`}
                placeholder="Опишите ваши пожелания, особенности или вопросы..."
              />
              {errors.description && (
                <div className="mt-2 text-xs text-red-300 flex items-center">
                  <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                  {errors.description.message}
                </div>
              )}
            </div>

            {/* Кнопка отправки */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-black font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-yellow-400/30 text-lg min-w-[200px]"
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                      Отправляем...
                    </span>
                  ) : (
                    'Записаться на услугу'
                  )}
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Модалка успеха */}
      {submitStatus.type === 'success' && (
        <SuccessModal onClose={onCloseSuccess} />
      )}
    </section>
  )
}

export default OrderForm