import { Base, BaseProps } from '@proto-native/components/base'
import * as React from 'react-native'

export type WizardStepProps = BaseProps & {
  id: string
}

export function WizardStep(props: WizardStepProps) {
  const { ...passed } = props

  return <Base {...passed}></Base>
}
