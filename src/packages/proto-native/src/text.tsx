import { Base } from '@proto-native/base'
import * as React from 'react-native'
import styled from 'styled-components/native'

export type TextProps = React.TextProps

export function Text(props: TextProps) {
  const textOwnProps = takeTextOwnProps(props)

  return (
    <TextWrapper {...textOwnProps.rest}>
      <TextBase {...textOwnProps.taken} />
    </TextWrapper>
  )
}

export function takeTextOwnProps<T extends TextProps>(props: T) {
  const { children, style, ...rest } = props
  const { color, fontWeight, ...styleRest } = React.StyleSheet.flatten(style)
  return {
    taken: { children, style: { color, fontWeight } },
    rest: { ...rest, style: styleRest },
  }
}

const TextWrapper = styled(Base)``

const TextBase = styled.Text`
  color: ${(p) => p.theme.colors.text.primary};
  font-size: 18px;
`
