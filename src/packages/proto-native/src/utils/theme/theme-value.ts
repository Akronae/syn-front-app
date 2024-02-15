import { DefaultTheme } from 'styled-components/native'

export type ThemeValue<TReturn, TTheme = DefaultTheme> =
  | ((theme: TTheme) => TReturn)
  | TReturn
