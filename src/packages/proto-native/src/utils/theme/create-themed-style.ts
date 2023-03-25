import { DefaultTheme } from 'styled-components/native'
import { ThemedStyle } from './themed-style'
import * as Native from 'react-native'

export function createThemedStyle<T extends Record<string, any>>(
  p: ThemedStyle<T>,
): (
  theme: DefaultTheme,
  props?: T,
  ...more: any[]
) => ReturnType<ThemedStyle<T>> {
  return (theme: DefaultTheme, props?: T, ...more: any[]) => {
    if (!props) props = {} as T
    const concatProps = { ...props, theme, ...more }
    let themedStyle = p(concatProps)
    if (concatProps.style) {
      themedStyle = Native.StyleSheet.flatten([themedStyle, concatProps.style])
    }

    return themedStyle
  }
}
