import { Controller } from 'react-hook-form'
import CustomSelect from './CustomSelect'

interface DateTimeSelectorProps {
  control: any
  errors: any
}

// Селектор даты и времени
function DateTimeSelector({ control, errors }: DateTimeSelectorProps): React.JSX.Element {
  // Генерация опций дат
  const dateOptions = [
    { value: '', label: 'Выберите дату' },
    ...Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() + i)
      const day = date.getDate()
      const month = date.toLocaleDateString('ru-RU', { month: 'short' })
      const value = date.toISOString().split('T')[0]
      return {
        value,
        label: `${day} ${month}`
      }
    })
  ]

  // Опции времени
  const timeOptions = [
    { value: '', label: 'Выберите время' },
    { value: '09:00', label: '09:00 (утро)' },
    { value: '10:00', label: '10:00 (утро)' },
    { value: '11:00', label: '11:00 (утро)' },
    { value: '12:00', label: '12:00 (день)' },
    { value: '13:00', label: '13:00 (день)' },
    { value: '14:00', label: '14:00 (день)' },
    { value: '15:00', label: '15:00 (день)' },
    { value: '16:00', label: '16:00 (день)' },
    { value: '17:00', label: '17:00 (день)' },
    { value: '18:00', label: '18:00 (вечер)' },
    { value: '19:00', label: '19:00 (вечер)' },
    { value: '20:00', label: '20:00 (вечер)' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Дата */}
      <div>
        <label htmlFor="preferredDate" className="block text-sm font-semibold text-white mb-3 tracking-wide">
          Предпочтительная дата *
        </label>
        <Controller
          name="preferredDate"
          control={control}
          render={({ field }) => (
            <CustomSelect
              value={field.value || ''}
              onChange={field.onChange}
              options={dateOptions}
              placeholder="Выберите дату"
              error={!!errors.preferredDate}
            />
          )}
        />
        {errors.preferredDate && (
          <div className="mt-2 text-xs text-red-300 flex items-center">
            <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
            {errors.preferredDate.message}
          </div>
        )}
      </div>
      
      {/* Время */}
      <div>
        <label htmlFor="preferredTime" className="block text-sm font-semibold text-white mb-3 tracking-wide">
          Предпочтительное время *
        </label>
        <Controller
          name="preferredTime"
          control={control}
          render={({ field }) => (
            <CustomSelect
              value={field.value || ''}
              onChange={field.onChange}
              options={timeOptions}
              placeholder="Выберите время"
              error={!!errors.preferredTime}
            />
          )}
        />
        {errors.preferredTime && (
          <div className="mt-2 text-xs text-red-300 flex items-center">
            <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
            {errors.preferredTime.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default DateTimeSelector
