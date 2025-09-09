import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { orderFormSchema, type OrderFormSchema } from './schema'
import { useState } from 'react'
import { TelegramService } from '../../telegram/service'
import type { OrderFormData } from './types'

export const useOrderForm = () => {
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
      description: ''
    },
    mode: 'onBlur'
  })

  // Умный обработчик телефона - форматирует на лету
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Разрешаем только цифры, +, пробелы, дефисы, скобки
    value = value.replace(/[^\d+\s()-]/g, '')
    
    // Автоформатирование для удобства ввода
    const digits = value.replace(/\D/g, '')
    
    if (digits.length <= 1) {
      value = digits
    } else if (digits.length <= 4) {
      // +7 (XXX
      value = `+7 (${digits.slice(1)}`
    } else if (digits.length <= 7) {
      // +7 (XXX) XXX
      value = `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
    } else if (digits.length <= 9) {
      // +7 (XXX) XXX-XX
      value = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    } else {
      // +7 (XXX) XXX-XX-XX
      value = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
    }
    
    e.target.value = value
  }

  const onSubmit = async (data: OrderFormSchema) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Преобразуем данные в формат для Telegram
      const orderData: OrderFormData = {
        name: data.name,
        phone: data.phone,
        serviceType: data.serviceType,
        preferredDate: data.preferredDate,
        description: data.description
      }

      // Отправляем заказ в Telegram
      const result = await TelegramService.sendOrder(orderData)
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message })
        
        // Сброс формы при успешной отправке
        form.reset()
      } else {
        setSubmitStatus({ type: 'error', message: result.message })
      }
    } catch {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Произошла ошибка при отправке заказа. Попробуйте позже.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseSuccess = () => {
    setSubmitStatus({ type: null, message: '' })
  }

  return {
    form,
    isSubmitting,
    submitStatus,
    onSubmit,
    handleCloseSuccess,
    handlePhoneChange
  }
}
