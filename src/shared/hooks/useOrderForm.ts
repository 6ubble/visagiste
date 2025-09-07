import { useForm } from 'react-hook-form'
import { getFormConfig, type OrderFormSchema } from '../../widgets/order-form/schema'
import { useState, useCallback, useMemo, useRef } from 'react'
import { TelegramService } from '../../shared/telegram/service'
import type { OrderFormData } from '../../widgets/order-form/types'


export const useOrderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  // Мемоизируем конфигурацию формы один раз
  const formConfig = useMemo(() => getFormConfig(), [])
  const form = useForm<OrderFormSchema>(formConfig)

  // Кэш для телефонного форматирования
  const phoneFormatCache = useRef(new Map<string, string>())

  // ОПТИМИЗИРОВАННЫЙ обработчик телефона с debounce
  const formatPhoneImmediate = useCallback((value: string): string => {
    // Проверяем кэш
    if (phoneFormatCache.current.has(value)) {
      return phoneFormatCache.current.get(value)!
    }

    // Разрешаем только цифры, +, пробелы, дефисы, скобки
    let cleanValue = value.replace(/[^\d+\s()-]/g, '')
    
    // Автоформатирование для удобства ввода
    const digits = cleanValue.replace(/\D/g, '')
    
    let formatted: string
    
    if (digits.length <= 1) {
      formatted = digits
    } else if (digits.length <= 4) {
      formatted = `+7 (${digits.slice(1)}`
    } else if (digits.length <= 7) {
      formatted = `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
    } else if (digits.length <= 9) {
      formatted = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    } else {
      formatted = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
    }

    // Кэшируем результат
    phoneFormatCache.current.set(value, formatted)
    return formatted
  }, [])


  // МЕМОИЗИРОВАННЫЙ обработчик телефона
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Немедленное форматирование для UX
    const formatted = formatPhoneImmediate(e.target.value)
    e.target.value = formatted
  }, [formatPhoneImmediate])

  // МЕМОИЗИРОВАННЫЙ обработчик отправки с оптимизациями
  const onSubmit = useCallback(async (data: OrderFormSchema) => {
    // Предотвращаем двойную отправку
    if (isSubmitting) return

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Преобразуем данные с мемоизацией
      const orderData: OrderFormData = {
        name: data.name.trim(),
        phone: data.phone,
        serviceType: data.serviceType,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        description: data.description?.trim() || ''
      }

      // Отправляем заказ в Telegram с retry логикой
      const result = await TelegramService.sendOrder(orderData)
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message })
        
        // Сброс формы с очисткой кэша
        form.reset()
        phoneFormatCache.current.clear()
      } else {
        setSubmitStatus({ type: 'error', message: result.message })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Произошла ошибка при отправке заказа. Попробуйте позже.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [isSubmitting, form])

  // МЕМОИЗИРОВАННЫЙ обработчик закрытия
  const handleCloseSuccess = useCallback(() => {
    setSubmitStatus({ type: null, message: '' })
  }, [])

  // МЕМОИЗИРУЕМ возвращаемые значения
  return useMemo(() => ({
    form,
    isSubmitting,
    submitStatus,
    onSubmit,
    handleCloseSuccess,
    handlePhoneChange
  }), [
    form, 
    isSubmitting, 
    submitStatus, 
    onSubmit, 
    handleCloseSuccess, 
    handlePhoneChange
  ])
}

// Хук для оптимизации полей ввода
export const useOptimizedInput = (
  name: string,
  form: any,
  formatter?: (value: string) => string
) => {
  const fieldValue = form.watch(name)
  const fieldError = form.formState.errors[name]
  
  // Мемоизируем onChange для предотвращения ререндеров
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    if (formatter) {
      value = formatter(value)
    }
    
    form.setValue(name, value, { 
      shouldValidate: false, // Валидируем только onBlur
      shouldDirty: true 
    })
  }, [form, name, formatter])
  
  return {
    value: fieldValue,
    error: fieldError,
    onChange: handleChange,
    ...form.register(name)
  }
}