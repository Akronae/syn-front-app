import { Base, BaseProps } from '@proto-native/components/base'
import * as React from 'react-native'

export type WizardStepProps = BaseProps & {
  id: string
}

function WizardStepBase(props: WizardStepProps) {
  const { ...passed } = props

  return <Base {...passed}></Base>
}

export const WizardStep = WizardStepBase
