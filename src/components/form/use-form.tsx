import { FormContext } from './form-context'
import { FormHandle } from './form-handle'
import { useContext } from 'react'

export function useForm(): FormHandle {
  let context: FormHandle | null = null

  const errMsg = `\`useForm\` must be used within \`Form\``

  try {
    context = useContext(FormContext)
  } catch (e) {
    throw new Error(`${errMsg}\n${e}`)
  }

  if (!context) {
    throw new Error(errMsg)
  }

  return context
}

export default useForm
