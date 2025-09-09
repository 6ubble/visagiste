// Типы для компонента OrderForm

export interface OrderFormData {
  name: string
  phone: string
  serviceType: string
  preferredDate: string
  description?: string
}

export interface ServiceType {
  id: string
  name: string
}

export interface SubmitStatus {
  type: 'success' | 'error' | null
  message: string
}
