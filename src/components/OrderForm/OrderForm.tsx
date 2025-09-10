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
  const { register, handleSubmit, formState: { errors } } = useFormContext<OrderFormSchema>()

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
              <label htmlFor="serviceType" className="block text-sm font-semibold text-white mb-2">
                Выберите услугу *
              </label>
              <div className="relative">
                <select
                  id="serviceType"
                  {...register('serviceType')}
                  className={`w-full px-4 py-3 pr-12 bg-white/10 border rounded-xl focus:outline-none transition-all duration-200 text-white appearance-none cursor-pointer ${
                    errors.serviceType 
                      ? 'border-red-400 focus:border-red-300' 
                      : 'border-white/20 focus:border-yellow-400'
                  }`}
                >
                  <option value="" className="bg-gray-800 text-white">
                    Выберите услугу
                  </option>
                  {SERVICE_TYPES.map((service) => (
                    <option 
                      key={service.id} 
                      value={service.id}
                      className="bg-gray-800 text-white"
                    >
                      {service.name}
                    </option>
                  ))}
                </select>
                {/* Кастомная стрелка */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg 
                    className={`w-5 h-5 transition-all duration-200 ${
                      errors.serviceType ? 'text-red-400' : 'text-yellow-400'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </div>
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
              <div className="relative">
                <input
                  type="date"
                  id="preferredDate"
                  {...register('preferredDate')}
                  className={`w-full px-4 py-3 pr-12 bg-white/10 border rounded-xl focus:outline-none transition-all duration-200 text-white placeholder-gray-400 ${
                    errors.preferredDate 
                      ? 'border-red-400 focus:border-red-300' 
                      : 'border-white/20 focus:border-yellow-400'
                  }`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {/* Иконка календаря */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                  onClick={() => {
                    const input = document.getElementById('preferredDate') as HTMLInputElement;
                    if (input) {
                      try {
                        (input as any).showPicker();
                      } catch {
                        input.focus();
                        input.click();
                      }
                    }
                  }}
                >
                  <svg 
                    className={`w-5 h-5 transition-all duration-200 ${
                      errors.preferredDate ? 'text-red-400' : 'text-yellow-400'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                </button>
              </div>
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