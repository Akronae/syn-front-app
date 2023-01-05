import { Base, BaseProps } from '@proto-native'
import { forwardRef } from 'react'
import * as React from 'react-native'
import styled from 'styled-components/native'

export type _TemplateProps = BaseProps

const _Template = forwardRef<typeof _TemplateBase, _TemplateProps>(
  (props: _TemplateProps) => {
    const { ...passed } = props

    return <_TemplateBase {...passed}></_TemplateBase>
  },
)
_Template.displayName = `_Template`

const _TemplateBase = styled(Base)`` as typeof Base
