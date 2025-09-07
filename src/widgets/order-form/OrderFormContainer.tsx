import { FormProvider } from 'react-hook-form'
import OrderForm from './OrderForm.tsx'
import { useOrderForm } from '../../shared/hooks/useOrderForm.ts'

function OrderFormContainer() {
  const { form, isSubmitting, submitStatus, onSubmit, handleCloseSuccess, handlePhoneChange } = useOrderForm()

  return (
    <FormProvider {...form}>
      <OrderForm
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        onSubmit={onSubmit}
        onCloseSuccess={handleCloseSuccess}
        onPhoneChange={handlePhoneChange}
      />
    </FormProvider>
  )
}

export default OrderFormContainer