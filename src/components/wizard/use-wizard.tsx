import { useContext } from 'react'
import { WizardContext } from './wizard-context'
import { WizardHandle } from './wizard-handle'

export function useWizard<T>(key: keyof T, data: T[keyof T]): WizardHandle<T> {
  let context: WizardHandle<T> | null = null

  try {
    context = useContext(WizardContext)
  } catch (e) {
    throw new Error(`\`useWizard\` must be used within \`Wizard.Body\`\n${e}`)
  }

  if (!context) {
    throw new Error(`\`useWizard\` must be used within \`Wizard.Body\``)
  }

  if (context.data) context.data.state[key] = data

  return context
}

export default useWizard
