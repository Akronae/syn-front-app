import { Base, BaseProps } from '@proto-native/components/base'
import * as React from 'react-native'

export type WizardPathProps = BaseProps

function WizardPathBase(props: WizardPathProps) {
  const { ...passed } = props

  return <Base {...passed}></Base>
}

export const WizardPath = WizardPathBase
