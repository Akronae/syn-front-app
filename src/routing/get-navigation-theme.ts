import { DefaultTheme } from 'styled-components/native'

export function getNavigationTheme(theme: DefaultTheme) {
  const navigationTheme = {
    dark: theme.syn.dark,
    colors: {
      primary: theme.syn.colors.surface.primary,
      background: theme.syn.colors.surface.default,
      card: theme.syn.colors.surface.default,
      text: theme.syn.colors.text.primary,
      border: theme.syn.colors.surface.disabled,
      notification: theme.syn.colors.surface.sub,
    },
  }

  return navigationTheme
}
