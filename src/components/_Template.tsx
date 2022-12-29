import { Base, BaseProps } from '@proto-native'
import * as React from 'react-native'
import styled from 'styled-components/native'

export type _TemplateProps = BaseProps

export function _Template(props: _TemplateProps) {
  const { ...passed } = props

  return <_TemplateBase {...passed}></_TemplateBase>
}

const _TemplateBase = styled(Base)`` as typeof Base
