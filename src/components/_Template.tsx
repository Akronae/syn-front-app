import * as React from 'react-native'
import { Base, BaseProps } from '~/components/Base'

export type _TemplateProps = BaseProps

export function _Template(props: _TemplateProps) {
  const { style, ...passed } = props

  return <Base style={[style, styles._Template]} {...passed}>

  </Base>
}

const styles = React.StyleSheet.create({
  _Template: {},
})

export const _TemplateStyles = styles
