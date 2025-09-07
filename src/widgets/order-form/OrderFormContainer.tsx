import { FormProvider } from 'react-hook-form'
import OrderForm from './OrderForm.tsx'
import { useOrderForm } from '../../shared/hooks/useOrderForm.ts'
import type { OrderFormSchema } from './schema'

function OrderFormContainer(): React.JSX.Element {
  const { form, isSubmitting, submitStatus, onSubmit, handleCloseSuccess, handlePhoneChange } = useOrderForm()

  // Создаем обертку для onSubmit, которая принимает данные формы
  const handleSubmit = (data: OrderFormSchema) => {
    onSubmit(data)
  }

  return (
    <FormProvider {...form}>
      <OrderForm
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        onSubmit={handleSubmit}
        onCloseSuccess={handleCloseSuccess}
        onPhoneChange={handlePhoneChange}
      />
    </FormProvider>
  )
}

export default OrderFormContainer
