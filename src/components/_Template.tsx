import * as React from 'react-native'
import styled from 'styled-components/native'
import { Base, BaseProps } from '@proto-native/base'

export type _TemplateProps = BaseProps

export function _Template(props: _TemplateProps) {
  const { ...passed } = props

  return <_TemplateBase {...passed}>

  </_TemplateBase>
}

const _TemplateBase = styled(Base)`
`;
