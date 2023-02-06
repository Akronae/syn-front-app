import { DefaultTheme } from 'styled-components/native'
import { ThemeValue } from './theme-value'

export function computeThemeValue<T>(
  value: ThemeValue<T> | undefined,
  theme: DefaultTheme,
) {
  if (typeof value === `undefined`) {
    return value
  }
  if (typeof value === `function`) {
    return (value as (theme: DefaultTheme) => T)(theme)
  }

  return value
}
