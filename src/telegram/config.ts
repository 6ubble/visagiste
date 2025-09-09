// Конфигурация Telegram бота для отправки заказов
export const TELEGRAM_CONFIG = {
  // ID чата или канала куда будут приходить заказы
  CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID,
  
  // Токен бота
  BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
  
  // URL API Telegram для отправки сообщений
  API_URL: 'https://api.telegram.org/bot',
  
  // Формат сообщения для заказа
  MESSAGE_TEMPLATE: (data: { name: string; phone: string; serviceType: string; preferredDate: string; description?: string }) => `
💄 *НОВАЯ ЗАЯВКА НА УСЛУГУ*

👤 *Имя:* ${data.name}
📱 *Телефон:* ${data.phone}
✨ *Услуга:* ${data.serviceType}
📅 *Предпочтительная дата:* ${data.preferredDate}
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
