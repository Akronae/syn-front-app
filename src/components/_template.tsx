import { Base, BaseProps } from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as React from 'react'

export type _TemplateProps = BaseProps

export function _Template(props: _TemplateProps) {
  const { ...passed } = props

  return <_TemplateBase {...passed}></_TemplateBase>
}
// export const _Template = React.forwardRef<typeof _TemplateBase, _TemplateProps>(
//   (props: _TemplateProps) => {
//     const { ...passed } = props

//     return <_TemplateBase {...passed}></_TemplateBase>
//   },
// )
// _Template.displayName = `_Template`

const _TemplateBase = themed(Base, (_p) => ({}))
