import * as React from 'react-native'
import styled from 'styled-components/native'

export type TextProps = React.TextProps

export function Text(props: TextProps) {
  return <TextBase {...props} />
}

const TextBase = styled.Text`
  color: ${(p) => p.theme.colors.text.primary};
  font-size: 18px;
`
