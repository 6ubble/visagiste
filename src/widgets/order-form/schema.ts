import * as yup from 'yup'

// Функция для нормализации телефона
const normalizePhone = (phone: string): string => {
  // Удаляем все нецифровые символы
  const digits = phone.replace(/\D/g, '')
  
  // Если начинается с 8, заменяем на 7
  if (digits.startsWith('8') && digits.length === 11) {
    return '+7' + digits.slice(1)
  }
  
  // Если начинается с 7, добавляем +
  if (digits.startsWith('7') && digits.length === 11) {
    return '+' + digits
  }
  
  // Если 10 цифр, добавляем +7
  if (digits.length === 10) {
    return '+7' + digits
  }
  
  return phone
}

export const orderFormSchema = yup.object({
  name: yup
    .string()
    .required('Имя обязательно для заполнения')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов')
    .matches(/^[а-яёА-ЯЁa-zA-Z\s-]+$/u, 'Имя может содержать только буквы, пробелы и дефисы'),
  
  phone: yup
    .string()
    .required('Номер телефона обязателен для заполнения')
    .transform(normalizePhone) // Автоматическая нормализация
    .matches(/^\+7[0-9]{10}$/, 'Введите корректный российский номер телефона')
    .test('phone-length', 'Номер должен содержать 10 цифр после +7', 
          (value) => value ? value.length === 12 : false),
  
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
    .defined()
})

export type OrderFormSchema = yup.InferType<typeof orderFormSchema>