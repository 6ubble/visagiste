import { SERVICE_TYPES } from './constants.ts'
import { useFormContext, Controller } from 'react-hook-form'
import type { OrderFormSchema } from './schema'
import SuccessModal from './SuccessModal'
import CustomSelect from './CustomSelect'

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
  const { register, handleSubmit, formState: { errors }, watch, control } = useFormContext<OrderFormSchema>()
  const watchedServiceType = watch('serviceType')

  return (
    <section id="order" className="py-20">
      
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Записаться на процедуру
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Заполните форму и мы свяжемся с вами для подтверждения записи
          </p>
        </div>

        {/* Форма */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl shadow-yellow-400/10">
          {/* Статус отправки - только для ошибок */}
          {submitStatus.type === 'error' && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-400/30 text-red-300 backdrop-blur-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-3 bg-red-400 flex-shrink-0"></div>
                <span className="font-medium text-sm">{submitStatus.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Имя и телефон */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-3 tracking-wide">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-gray-400 ${
                    errors.name 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-white/20 focus:border-yellow-400/50'
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
                <label htmlFor="phone" className="block text-sm font-semibold text-white mb-3 tracking-wide">
                  Номер телефона *
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  onChange={onPhoneChange}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-gray-400 ${
                    errors.phone 
                      ? 'border-red-400 focus:border-red-400' 
                      : 'border-white/20 focus:border-yellow-400/50'
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
              <label className="block text-sm font-semibold text-white mb-4 tracking-wide">
                Тип услуги *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {SERVICE_TYPES.map((service) => (
                  <label 
                    key={service.id}
                    className={`flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                      watchedServiceType === service.id 
                        ? 'border-yellow-400/50 bg-yellow-400/10 shadow-lg shadow-yellow-400/20' 
                        : 'border-white/20 hover:border-yellow-400/30 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      {...register('serviceType')}
                      value={service.id}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-semibold text-white text-sm leading-tight tracking-wide">{service.name}</div>
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

            {/* Предпочтительная дата и время */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-semibold text-white mb-3 tracking-wide">
                  Предпочтительная дата *
                </label>
                <Controller
                  name="preferredDate"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      value={field.value || ''}
                      onChange={field.onChange}
                      options={[
                        { value: '', label: 'Выберите дату' },
                        ...Array.from({ length: 30 }, (_, i) => {
                          const date = new Date()
                          date.setDate(date.getDate() + i)
                          const day = date.getDate()
                          const month = date.toLocaleDateString('ru-RU', { month: 'short' })
                          const value = date.toISOString().split('T')[0]
                          return {
                            value,
                            label: `${day} ${month}`
                          }
                        })
                      ]}
                      placeholder="Выберите дату"
                      error={!!errors.preferredDate}
                    />
                  )}
                />
                {errors.preferredDate && (
                  <div className="mt-2 text-xs text-red-300 flex items-center">
                    <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                    {errors.preferredDate.message}
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="preferredTime" className="block text-sm font-semibold text-white mb-3 tracking-wide">
                  Предпочтительное время *
                </label>
                <Controller
                  name="preferredTime"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      value={field.value || ''}
                      onChange={field.onChange}
                      options={[
                        { value: '', label: 'Выберите время' },
                        { value: '09:00', label: '09:00 (утро)' },
                        { value: '10:00', label: '10:00 (утро)' },
                        { value: '11:00', label: '11:00 (утро)' },
                        { value: '12:00', label: '12:00 (день)' },
                        { value: '13:00', label: '13:00 (день)' },
                        { value: '14:00', label: '14:00 (день)' },
                        { value: '15:00', label: '15:00 (день)' },
                        { value: '16:00', label: '16:00 (день)' },
                        { value: '17:00', label: '17:00 (день)' },
                        { value: '18:00', label: '18:00 (вечер)' },
                        { value: '19:00', label: '19:00 (вечер)' },
                        { value: '20:00', label: '20:00 (вечер)' }
                      ]}
                      placeholder="Выберите время"
                      error={!!errors.preferredTime}
                    />
                  )}
                />
                {errors.preferredTime && (
                  <div className="mt-2 text-xs text-red-300 flex items-center">
                    <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                    {errors.preferredTime.message}
                  </div>
                )}
              </div>
            </div>

            {/* Дополнительные пожелания */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-white mb-3 tracking-wide">
                Дополнительные пожелания
              </label>
              <textarea
                id="description"
                rows={4}
                {...register('description')}
                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none resize-none transition-all duration-300 text-white placeholder-gray-400 ${
                  errors.description 
                    ? 'border-red-400 focus:border-red-400' 
                    : 'border-white/20 focus:border-yellow-400/50'
                }`}
                placeholder="Расскажите о ваших пожеланиях: желаемый объем, цвет, техника наращивания и т.д."
              />
              {errors.description && (
                <div className="mt-2 text-xs text-red-300 flex items-center">
                  <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                  {errors.description.message}
                </div>
              )}
            </div>

            {/* Кнопка отправки */}
            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative min-w-[280px] max-w-full px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-black font-bold rounded-full transition-all duration-300 text-lg focus:outline-none shadow-lg hover:shadow-2xl hover:shadow-yellow-400/30 transform hover:-translate-y-1 disabled:transform-none"
              >
                <span className="relative z-10 tracking-wide">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                      Отправляем...
                    </span>
                  ) : (
                    'ЗАПИСАТЬСЯ НА ПРОЦЕДУРУ'
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