import { useForm } from 'react-hook-form'
import { getFormConfig, type OrderFormSchema } from '../../widgets/order-form/schema'
import { useState } from 'react'
import { TelegramService } from '../../shared/telegram/service'
import type { OrderFormData } from '../../widgets/order-form/types'

export const useOrderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const form = useForm<OrderFormSchema>(getFormConfig())

  // Простое форматирование телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  // Простая отправка формы
  const onSubmit = async (data: OrderFormSchema) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const orderData: OrderFormData = {
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
        form.reset()
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