import { useContext } from 'react'
import { FormFieldContext } from './form-field-context'
import { FormFieldHandle } from './form-field-handle'

export function useFormField(): FormFieldHandle | null {
  const context = useContext(FormFieldContext)

  return context
}

export default useFormField
