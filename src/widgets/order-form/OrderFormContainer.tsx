import { memo, useCallback } from 'react'
import { FormProvider } from 'react-hook-form'
import OrderForm from './OrderForm.tsx'
import { useOrderForm } from '../../shared/hooks/useOrderForm.ts'
import type { OrderFormSchema } from './schema'

// Мемоизированный OrderFormContainer
const OrderFormContainer = memo((): React.JSX.Element => {
  const { form, isSubmitting, submitStatus, onSubmit, handleCloseSuccess, handlePhoneChange } = useOrderForm()

  // Мемоизируем обертку для onSubmit
  const handleSubmit = useCallback((data: OrderFormSchema) => {
    onSubmit(data)
  }, [onSubmit])

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
})

export default OrderFormContainer
