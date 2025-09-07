import { TELEGRAM_CONFIG, getTelegramApiUrl, isTelegramConfigured } from './config.ts'
import type { OrderFormData } from '../../widgets/order-form/types.ts'
import { SERVICE_TYPES } from '../../widgets/order-form/constants.ts'

// Интерфейс для ответа от Telegram API
interface TelegramResponse {
  ok: boolean
  result?: unknown
  error_code?: number
  description?: string
}

// Сервис для работы с Telegram API
export class TelegramService {
  // Получение человекочитаемого названия типа услуги
  private static getServiceTypeName(serviceTypeId: string): string {
    const service = SERVICE_TYPES.find(s => s.id === serviceTypeId)
    return service ? service.name : serviceTypeId
  }

  // Отправка заказа в Telegram
  static async sendOrder(orderData: OrderFormData): Promise<{ success: boolean; message: string }> {
    try {
      // Проверяем конфигурацию
      if (!isTelegramConfigured()) {
        throw new Error('Telegram бот не настроен. Создайте файл .env с настройками бота.')
      }

      // Получаем человекочитаемое название типа услуги
      const serviceTypeName = this.getServiceTypeName(orderData.serviceType)

      // Формируем сообщение с правильным названием услуги
      const message = TELEGRAM_CONFIG.MESSAGE_TEMPLATE({
        ...orderData,
        serviceType: serviceTypeName
      })
      
      // Проверяем длину сообщения (Telegram ограничивает до 4096 символов)
      if (message.length > 4000) {
        throw new Error('Сообщение слишком длинное. Сократите описание.')
      }

      // Создаем тело запроса
      const requestBody = {
        chat_id: TELEGRAM_CONFIG.CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      }

      // Отправляем запрос к Telegram API
      const response = await fetch(`${getTelegramApiUrl()}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(`Ошибка 400: Неверный запрос. Проверьте Chat ID и токен бота.`)
        } else if (response.status === 401) {
          throw new Error(`Ошибка 401: Неверный токен бота.`)
        } else if (response.status === 403) {
          throw new Error(`Ошибка 403: Бот заблокирован или не имеет доступа к чату.`)
        } else if (response.status === 404) {
          throw new Error(`Ошибка 404: Бот не найден.`)
        } else {
          throw new Error(`HTTP ошибка ${response.status}: ${response.statusText}`)
        }
      }

      const result: TelegramResponse = await response.json()

      if (!result.ok) {
        throw new Error(`Telegram API ошибка ${result.error_code}: ${result.description || 'Неизвестная ошибка'}`)
      }

      return {
        success: true,
        message: 'Заявка успешно отправлена! Мы свяжемся с вами для подтверждения записи.'
      }

    } catch (error) {
      console.error('Ошибка отправки в Telegram:', error)
      
      return {
        success: false,
        message: error instanceof Error 
          ? `Ошибка отправки: ${error.message}` 
          : 'Произошла ошибка при отправке заказа. Попробуйте позже.'
      }
    }
  }

  // Проверка доступности бота
  static async checkBotStatus(): Promise<boolean> {
    try {
      if (!isTelegramConfigured()) {
        return false
      }

      const response = await fetch(`${getTelegramApiUrl()}/getMe`)
      const result: TelegramResponse = await response.json()
      
      return result.ok
    } catch {
      return false
    }
  }

  // Получение информации о статусе конфигурации
  static getConfigurationStatus(): { configured: boolean; missingFields: string[] } {
    const missingFields: string[] = []
    
    if (!TELEGRAM_CONFIG.CHAT_ID) {
      missingFields.push('VITE_TELEGRAM_CHAT_ID')
    }
    
    if (!TELEGRAM_CONFIG.BOT_TOKEN) {
      missingFields.push('VITE_TELEGRAM_BOT_TOKEN')
    }

    return {
      configured: missingFields.length === 0,
      missingFields
    }
  }

  // Проверка валидности Chat ID
  static isValidChatId(chatId: string): boolean {
    // Chat ID должен быть числом или строкой, начинающейся с @ для каналов
    return /^(@\w+|\d+)$/.test(chatId)
  }

  // Проверка валидности токена бота
  static isValidBotToken(token: string): boolean {
    // Токен должен соответствовать формату: число:буквы_и_цифры
    return /^\d+:[A-Za-z0-9_-]+$/.test(token)
  }
}
