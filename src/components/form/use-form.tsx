import { useContext } from 'react'
import { FormContext } from './form-context'
import { FormHandle } from './form-handle'

export function useForm(): FormHandle | null {
  return useContext(FormContext)
}

export default useForm
