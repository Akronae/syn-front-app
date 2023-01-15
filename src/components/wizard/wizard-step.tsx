import { Base, BaseProps } from '@proto-native/components/base'
import * as React from 'react-native'
import styled from 'styled-components/native'

export type WizardStepProps = BaseProps

function WizardStepBase(props: WizardStepProps) {
  const { ...passed } = props

  return <Base {...passed}></Base>
}

export const WizardStep = styled(WizardStepBase)`` as typeof WizardStepBase
