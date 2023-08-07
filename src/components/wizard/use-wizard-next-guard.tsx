import { useContext } from 'react'
import { WizardContext } from './wizard-context'
import { WizardHandle } from './wizard-handle'

export function useWizardNextGuard(
  shouldGoNext: () => Promise<boolean> | boolean,
) {
  let context: WizardHandle<unknown> | null = null

  try {
    context = useContext(WizardContext)
  } catch (e) {
    throw new Error(
      `\`useWizardNextGuard\` must be used within \`Wizard.Body\`\n${e}`,
    )
  }

  if (!context) {
    throw new Error(
      `\`useWizardNextGuard\` must be used within \`Wizard.Body\``,
    )
  }

  context.guards.next = shouldGoNext
  return context.next
}

export default useWizardNextGuard
