import { useTheme } from 'styled-components/native'
import { ThemedStyle } from './themed-style'
import * as Native from 'react-native'
import * as React from 'react'

export function themed<T extends Record<string, any>>(
  comp: React.ComponentType<any>,
  p: ThemedStyle<T>,
): React.ComponentType<T> {
  const c = React.forwardRef((props: any, ref) => {
    const theme = useTheme()
    if (!props) props = {} as T
    const concatProps = { ...props, theme }
    let themedStyle = p(concatProps)
    if (concatProps.style) {
      themedStyle = Native.StyleSheet.flatten([themedStyle, concatProps.style])
    }

    return React.createElement(comp, { ...props, style: themedStyle, ref })
  }) as React.ForwardRefExoticComponent<any> & {
    extends: React.ComponentType<any>
  }

  Object.keys(comp).forEach((key) => {
    if (key == `$$typeof` || key == `render`) return
    ;(c as any)[key] = (comp as any)[key]
  })
  c.displayName = `ThemedComponent(${comp.displayName || comp.name})`
  c.extends = comp
  return c
}
