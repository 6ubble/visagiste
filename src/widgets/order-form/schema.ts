import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Функция для нормализации телефона (мемоизированная)
const phoneNormalizationCache = new Map<string, string>()

const normalizePhone = (phone: string): string => {
  // Проверяем кэш
  if (phoneNormalizationCache.has(phone)) {
    return phoneNormalizationCache.get(phone)!
  }

  // Удаляем все нецифровые символы
  const digits = phone.replace(/\D/g, '')
  
  let result: string
  
  // Если начинается с 8, заменяем на 7
  if (digits.startsWith('8') && digits.length === 11) {
    result = '+7' + digits.slice(1)
  }
  // Если начинается с 7, добавляем +
  else if (digits.startsWith('7') && digits.length === 11) {
    result = '+' + digits
  }
  // Если 10 цифр, добавляем +7
  else if (digits.length === 10) {
    result = '+7' + digits
  }
  else {
    result = phone
  }

  // Кэшируем результат
  phoneNormalizationCache.set(phone, result)
  return result
}

// ОПТИМИЗИРОВАННАЯ схема валидации
export const orderFormSchema = yup.object({
  name: yup
    .string()
    .required('Имя обязательно для заполнения')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов')
    .matches(/^[а-яёА-ЯЁa-zA-Z\s-]+$/u, 'Имя может содержать только буквы, пробелы и дефисы')
    .trim(), // Автоматически убираем пробелы
  
  phone: yup
    .string()
    .required('Номер телефона обязателен для заполнения')
    .transform(normalizePhone) // Используем кэшированную нормализацию
    .matches(/^\+7[0-9]{10}$/, 'Введите корректный российский номер телефона')
    .test('phone-length', 'Номер должен содержать 10 цифр после +7', 
          (value) => value ? value.length === 12 : false),
  
  serviceType: yup
    .string()
    .required('Выберите тип услуги'),
  
  preferredDate: yup
    .string()
    .required('Выберите предпочтительную дату')
    .test('future-date', 'Дата не может быть в прошлом', function(value) {
      if (!value) return false
      const selectedDate = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }),
  
  preferredTime: yup
    .string()
    .required('Выберите предпочтительное время')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Некорректный формат времени'),
  
  description: yup
    .string()
    .max(1000, 'Описание не должно превышать 1000 символов')
    .trim() // Убираем лишние пробелы
    .defined()
})

export type OrderFormSchema = yup.InferType<typeof orderFormSchema>

// Мемоизированная конфигурация для React Hook Form
export const getFormConfig = () => ({
  resolver: yupResolver(orderFormSchema),
  defaultValues: {
    name: '',
    phone: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    description: ''
  },
  mode: 'onTouched' as const, // Валидация только после взаимодействия
  reValidateMode: 'onChange' as const, // Ре-валидация при изменении
  shouldFocusError: true, // Автофокус на ошибку
  criteriaMode: 'firstError' as const // Показываем только первую ошибку
})