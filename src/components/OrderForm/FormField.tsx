
interface FormFieldProps {
  id: string
  label: string
  type: 'text' | 'tel'
  placeholder: string
  autoComplete?: string
  error?: string
  register: any
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// Переиспользуемый компонент поля формы
function FormField({ 
  id, 
  label, 
  type, 
  placeholder, 
  autoComplete, 
  error, 
  register, 
  onChange 
}: FormFieldProps): React.JSX.Element {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-white mb-3 tracking-wide">
        {label} *
      </label>
      <input
        type={type}
        id={id}
        {...register(id)}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-gray-400 ${
          error 
            ? 'border-red-400 focus:border-red-400' 
            : 'border-white/20 focus:border-yellow-400/50'
        }`}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {error && (
        <div className="mt-2 text-xs text-red-300 flex items-center">
          <div className="w-1 h-1 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
          {error}
        </div>
      )}
    </div>
  )
}

export default FormField
