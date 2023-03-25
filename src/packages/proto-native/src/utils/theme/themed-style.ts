import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { DefaultTheme } from 'styled-components/native'

export type ThemedStyle<T = Record<string, any>> = (
  p: { theme: DefaultTheme } & T,
) => ViewStyle | TextStyle | (ImageStyle & { stroke: string; fill: string })
