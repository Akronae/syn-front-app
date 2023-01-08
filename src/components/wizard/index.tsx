import { WizardBody } from './wizard-body'
import { WizardPath } from './wizard-path'
import { WizardStep } from './wizard-step'

export * from './use-wizard'
export * from './wizard-context'
export * from './wizard-handle'

const Wizard = {
  Body: WizardBody,
  Path: WizardPath,
  Step: WizardStep,
}
export default Wizard
