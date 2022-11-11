import { PropsWithChildren } from 'react'
import * as React from 'react-native'
import styled from 'styled-components/native'

export interface BaseProps extends PropsWithChildren {
}

export function Base(props: BaseProps) {
  const { children, ...passed } = props

  return (
    <BaseWrapper {...passed}>
      {children}
    </BaseWrapper>
  )
}

const BaseWrapper = styled.View`
`;