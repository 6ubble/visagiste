import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Простая нормализация телефона
const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '')
  
  if (digits.startsWith('8') && digits.length === 11) {
    return '+7' + digits.slice(1)
  }
  if (digits.startsWith('7') && digits.length === 11) {
    return '+' + digits
  }
  if (digits.length === 10) {
    return '+7' + digits
  }
  
  return phone
}

// Тип для формы
export type OrderFormSchema = {
  name: string
  phone: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  description?: string
}

// Схема валидации
export const orderFormSchema = yup.object({
  name: yup
    .string()
    .required('Имя обязательно для заполнения')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов')
    .trim(),
  
  phone: yup
    .string()
    .required('Номер телефона обязателен для заполнения')
    .transform(normalizePhone)
    .matches(/^\+7[0-9]{10}$/, 'Введите корректный российский номер телефона'),
  
  serviceType: yup
    .string()
    .required('Выберите тип услуги'),
  
  preferredDate: yup
    .string()
    .required('Выберите предпочтительную дату'),
  
  preferredTime: yup
    .string()
    .required('Выберите предпочтительное время'),
  
  description: yup
    .string()
    .max(1000, 'Описание не должно превышать 1000 символов')
    .trim()
    .optional()
})

// Конфигурация для React Hook Form
export const getFormConfig = () => ({
  resolver: yupResolver(orderFormSchema) as any,
  defaultValues: {
    name: '',
    phone: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    description: undefined
  },
  mode: 'onTouched' as const
})