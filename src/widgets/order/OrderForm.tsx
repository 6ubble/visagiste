import { useState, useCallback, useRef } from 'react'

// Типы
interface FormData {
  name: string
  phone: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  description: string
}

interface TelegramResponse {
  ok: boolean
  error_code?: number
  description?: string
}

// Константы
const SERVICE_TYPES = [
  { id: 'extension-classic', name: 'Наращивание' },
  { id: 'permanent-makeup', name: 'Перманентный макияж' },
  { id: 'lamination', name: 'Ламинирование' },
  { id: 'correction', name: 'Коррекция' }
]

const TIME_OPTIONS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
]

// Утилиты
const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 1) return digits
  if (digits.length <= 4) return `+7 (${digits.slice(1)}`
  if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
  if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
}

const generateDateOptions = () => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const day = date.getDate()
    const month = date.toLocaleDateString('ru-RU', { month: 'short' })
    return {
      value: date.toISOString().split('T')[0],
      label: `${day} ${month}`
    }
  })
}

// Валидация
const validateForm = (data: FormData): Record<string, string> => {
  const errors: Record<string, string> = {}
  
  if (!data.name.trim()) errors.name = 'Имя обязательно'
  else if (data.name.trim().length < 2) errors.name = 'Минимум 2 символа'
  
  const phoneDigits = data.phone.replace(/\D/g, '')
  if (!phoneDigits) errors.phone = 'Телефон обязателен'
  else if (phoneDigits.length !== 11) errors.phone = 'Неверный формат'
  
  if (!data.serviceType) errors.serviceType = 'Выберите услугу'
  if (!data.preferredDate) errors.preferredDate = 'Выберите дату'
  if (!data.preferredTime) errors.preferredTime = 'Выберите время'
  
  return errors
}

// Telegram API
const sendToTelegram = async (data: FormData): Promise<{success: boolean, message: string}> => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID
  
  if (!botToken || !chatId) {
    return { success: false, message: 'Telegram не настроен' }
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleDateString('ru-RU', { month: 'long' })
    return `${day} ${month}`
  }
  
  const serviceName = SERVICE_TYPES.find(s => s.id === data.serviceType)?.name || data.serviceType
  
  const message = `💄 *НОВАЯ ЗАПИСЬ*

👤 *Имя:* ${data.name}
📱 *Телефон:* ${data.phone}
💅 *Услуга:* ${serviceName}
📅 *Дата:* ${formatDate(data.preferredDate)}
🕐 *Время:* ${data.preferredTime}
📝 *Пожелания:* ${data.description || 'Не указано'}`

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    })
    
    const result: TelegramResponse = await response.json()
    
    if (!result.ok) {
      throw new Error(`Telegram API: ${result.description}`)
    }
    
    return { success: true, message: 'Заявка отправлена! Мы свяжемся с вами.' }
  } catch (error) {
    console.error('Ошибка отправки:', error)
    return { 
      success: false, 
      message: 'Ошибка отправки. Попробуйте позвонить: +7 952 600-51-26' 
    }
  }
}

// Компоненты
const SuccessModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
    <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl animate-slideUp">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3 animate-scaleIn">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" className="animate-checkmark" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Запись оформлена!</h3>
        <p className="text-gray-600 mb-4 text-sm">Мы получили вашу запись и свяжемся с вами в ближайшее время</p>
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 px-4 rounded-full transition-all duration-300 text-sm"
        >
          Понятно
        </button>
      </div>
    </div>
  </div>
)

// Основной компонент
export default function OptimizedOrderForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    description: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const dateOptions = useRef(generateDateOptions()).current
  
  // Обработчики
  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    if (field === 'phone') {
      value = formatPhone(value)
    }
    
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Убираем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }, [errors])
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const result = await sendToTelegram(formData)
      
      if (result.success) {
        setShowSuccess(true)
        setFormData({
          name: '',
          phone: '',
          serviceType: '',
          preferredDate: '',
          preferredTime: '',
          description: ''
        })
        setErrors({})
      } else {
        setErrorMessage(result.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [formData])
  
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
          {/* Ошибка отправки */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-400/30 text-red-300 backdrop-blur-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-3 bg-red-400 flex-shrink-0"></div>
                <span className="font-medium text-sm">{errorMessage}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Имя и телефон */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3 tracking-wide">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-gray-400 ${
                    errors.name ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-yellow-400/50'
                  }`}
                  placeholder="Введите ваше имя"
                  autoComplete="given-name"
                />
                {errors.name && (
                  <div className="mt-2 text-xs text-red-300 flex items-center">
                    <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                    {errors.name}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-white mb-3 tracking-wide">
                  Номер телефона *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-gray-400 ${
                    errors.phone ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-yellow-400/50'
                  }`}
                  placeholder="+7 (999) 123-45-67"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <div className="mt-2 text-xs text-red-300 flex items-center">
                    <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                    {errors.phone}
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
                    className={`flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm h-16 ${
                      formData.serviceType === service.id 
                        ? 'border-yellow-400/50 bg-yellow-400/10 shadow-lg shadow-yellow-400/20' 
                        : 'border-white/20 hover:border-yellow-400/30 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      value={service.id}
                      checked={formData.serviceType === service.id}
                      onChange={(e) => handleInputChange('serviceType', e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-semibold text-white text-xs md:text-sm leading-tight">{service.name}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.serviceType && (
                <div className="mt-2 text-xs text-red-300 flex items-center">
                  <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                  {errors.serviceType}
                </div>
              )}
            </div>

            {/* Дата и время */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3 tracking-wide">
                  Предпочтительная дата *
                </label>
                <select
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white ${
                    errors.preferredDate ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-yellow-400/50'
                  }`}
                >
                  <option value="" className="bg-gray-800 text-gray-300">Выберите дату</option>
                  {dateOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.preferredDate && (
                  <div className="mt-2 text-xs text-red-300 flex items-center">
                    <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                    {errors.preferredDate}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-white mb-3 tracking-wide">
                  Предпочтительное время *
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white ${
                    errors.preferredTime ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-yellow-400/50'
                  }`}
                >
                  <option value="" className="bg-gray-800 text-gray-300">Выберите время</option>
                  {TIME_OPTIONS.map((time) => (
                    <option key={time} value={time} className="bg-gray-800 text-white">
                      {time}
                    </option>
                  ))}
                </select>
                {errors.preferredTime && (
                  <div className="mt-2 text-xs text-red-300 flex items-center">
                    <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                    {errors.preferredTime}
                  </div>
                )}
              </div>
            </div>

            {/* Дополнительные пожелания */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3 tracking-wide">
                Дополнительные пожелания
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 focus:border-yellow-400/50 rounded-xl focus:outline-none resize-none transition-all duration-300 text-white placeholder-gray-400"
                placeholder="Расскажите о ваших пожеланиях: желаемый объем, цвет, техника наращивания и т.д."
              />
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
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </section>
  )
}