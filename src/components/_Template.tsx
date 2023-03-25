import { Base, BaseProps } from '@proto-native'
import * as React from 'react-native'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'

export type _TemplateProps = BaseProps

export function _Template(props: _TemplateProps) {
  const { ...passed } = props

  return <_TemplateBase {...passed}></_TemplateBase>
}

const _TemplateBase = themed(Base, (p) => ({}))
