import { DefaultTheme } from 'styled-components/native'

export type ThemeValue<T> = ((theme: DefaultTheme) => T) | T
