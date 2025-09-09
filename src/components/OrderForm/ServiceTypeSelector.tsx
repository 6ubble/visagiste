import { SERVICE_TYPES } from './constants.ts'

interface ServiceTypeSelectorProps {
  register: any
  watchedServiceType: string
  error?: string
}

// Селектор типа услуги
function ServiceTypeSelector({ register, watchedServiceType, error }: ServiceTypeSelectorProps): React.JSX.Element {
  return (
    <div>
      <label className="block text-sm font-semibold text-white mb-4 tracking-wide">
        Тип услуги *
      </label>
      <div className="grid grid-cols-2 gap-3">
        {SERVICE_TYPES.map((service) => (
          <label 
            key={service.id}
            className={`flex items-center justify-center p-4 border rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm h-16 ${
              watchedServiceType === service.id 
                ? 'border-yellow-400/50 bg-yellow-400/10 shadow-lg shadow-yellow-400/20' 
                : 'border-white/20 hover:border-yellow-400/30 bg-white/5 hover:bg-white/10'
            }`}
          >
            <input
              type="radio"
              {...register('serviceType')}
              value={service.id}
              className="sr-only"
            />
            <div className="text-center">
              <div className="font-semibold text-white text-xs md:text-sm leading-tight">{service.name}</div>
            </div>
          </label>
        ))}
      </div>
      {error && (
        <div className="mt-2 text-xs text-red-300 flex items-center">
          <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
          {error}
        </div>
      )}
    </div>
  )
}

export default ServiceTypeSelector
