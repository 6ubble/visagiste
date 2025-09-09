import { useState, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { orderFormSchema, type OrderFormSchema } from './schema'
import { TelegramService } from '../../shared/telegram'
import { SERVICE_TYPES } from './constants'
import SuccessModal from './SuccessModal'
import CustomSelect from './CustomSelect'
import FormField from './FormField'
import ServiceTypeSelector from './ServiceTypeSelector'
import DateTimeSelector from './DateTimeSelector'

function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const form = useForm<OrderFormSchema>({
    resolver: yupResolver(orderFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      serviceType: '',
      preferredDate: '',
      preferredTime: '',
      description: ''
    },
    mode: 'onTouched'
  })

  const { register, handleSubmit, formState: { errors }, watch, control, reset } = form

  // Простое форматирование телефона
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d+\s()-]/g, '')
    const digits = value.replace(/\D/g, '')
    
    if (digits.length <= 1) {
      e.target.value = digits
    } else if (digits.length <= 4) {
      e.target.value = `+7 (${digits.slice(1)}`
    } else if (digits.length <= 7) {
      e.target.value = `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
    } else if (digits.length <= 9) {
      e.target.value = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    } else {
      e.target.value = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
    }
  }, [])

  // Простая отправка формы
  const onSubmit = useCallback(async (data: OrderFormSchema) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const orderData = {
        name: data.name.trim(),
        phone: data.phone,
        serviceType: data.serviceType,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        description: data.description?.trim() || ''
      }

      const result = await TelegramService.sendOrder(orderData)
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message })
        reset()
      } else {
        setSubmitStatus({ type: 'error', message: result.message })
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Произошла ошибка при отправке заказа. Попробуйте позже.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [isSubmitting, reset])

  const handleCloseSuccess = useCallback(() => {
    setSubmitStatus({ type: null, message: '' })
  }, [])

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
              <FormField
                id="name"
                label="Ваше имя"
                type="text"
                placeholder="Введите ваше имя"
                autoComplete="given-name"
                error={errors.name?.message}
                register={register}
              />
              
              <FormField
                id="phone"
                label="Номер телефона"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                autoComplete="tel"
                error={errors.phone?.message}
                register={register}
                onChange={handlePhoneChange}
              />
            </div>

            {/* Тип услуги */}
            <ServiceTypeSelector
              register={register}
              watchedServiceType={watchedServiceType}
              error={errors.serviceType?.message}
            />

            {/* Предпочтительная дата и время */}
            <DateTimeSelector
              control={control}
              errors={errors}
            />

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
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-black font-bold rounded-full transition-all duration-300 text-sm md:text-base focus:outline-none shadow-lg hover:shadow-2xl hover:shadow-yellow-400/30 transform hover:-translate-y-1 disabled:transform-none"
              >
                <span className="relative z-10 tracking-wide">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                      Отправляем...
                    </span>
                  ) : (
                    'ЗАПИСАТЬСЯ'
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
        <SuccessModal onClose={handleCloseSuccess} />
      )}
    </section>
  )
}

export default OrderForm