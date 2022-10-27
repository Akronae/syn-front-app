import * as React from 'react-native'
import styled from 'styled-components/native'

export type TextProps = React.TextProps

function TextF(props: TextProps) {
  return <React.Text {...props} />
}

export const Text = styled(TextF)`
  color: ${p => p.theme.colors.text.primary};
  font-size: 18px;
`
