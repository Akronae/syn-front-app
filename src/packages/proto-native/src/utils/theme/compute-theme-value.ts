import { ThemeValue } from './theme-value'

export function computeThemeValue<TReturn, TTheme>(
  value: ThemeValue<TReturn, TTheme> | undefined,
  theme: TTheme,
) {
  if (typeof value === `undefined`) {
    return value
  }
  if (typeof value === `function`) {
    return (value as (theme: TTheme) => TReturn)(theme)
  }

  return value
}
