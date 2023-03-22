import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as Native from 'react-native'
import * as React from 'react'

export type _TemplateProps = BaseProps

export function _Template(props: _TemplateProps) {
  const { ...passed } = props

  return <_TemplateBase {...passed}></_TemplateBase>
}
// const _Template = forwardRef<typeof _TemplateBase, _TemplateProps>(
//   (props: _TemplateProps) => {
//     const { ...passed } = props

//     return <_TemplateBase {...passed}></_TemplateBase>
//   },
// )
// _Template.displayName = `_Template`

const _TemplateBase = themed(Base, _p => ({}))
