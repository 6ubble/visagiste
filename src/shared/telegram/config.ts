// Функция для форматирования даты в формат "число месяц"
const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString('ru-RU', { month: 'long' })
  
  return `${day} ${month}`
}

// Конфигурация Telegram бота для отправки заказов
export const TELEGRAM_CONFIG = {
  // ID чата или канала куда будут приходить заказы
  CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID,
  
  // Токен бота
  BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
  
  // URL API Telegram для отправки сообщений
  API_URL: 'https://api.telegram.org/bot',
  
  // Формат сообщения для записи
  MESSAGE_TEMPLATE: (data: { name: string; phone: string; serviceType: string; preferredDate: string; preferredTime: string; description?: string }) => `
💄 *НОВАЯ ЗАПИСЬ НА ПРОЦЕДУРУ*

👤 *Имя:* ${data.name}
📱 *Телефон:* ${data.phone}
💅 *Тип услуги:* ${data.serviceType}
📅 *Предпочтительная дата:* ${formatDate(data.preferredDate)}
🕐 *Предпочтительное время:* ${data.preferredTime}
📝 *Дополнительные пожелания:* ${data.description || 'Не указано'}
  `.trim()
}

// Функция для получения полного URL API
export const getTelegramApiUrl = () => {
  return `${TELEGRAM_CONFIG.API_URL}${TELEGRAM_CONFIG.BOT_TOKEN}`
}

// Проверка настроек бота
export const isTelegramConfigured = () => {
  return Boolean(TELEGRAM_CONFIG.CHAT_ID && TELEGRAM_CONFIG.BOT_TOKEN)
}
