import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { DefaultTheme } from 'styled-components/native'

export type RootStackParamList = {
  Home: undefined
  Read: Record<string, unknown>
}

export function getHeaderScreenOptions(
  theme: DefaultTheme,
): NativeStackNavigationOptions {
  return {
    headerTintColor: theme.syn.colors.text.contrast,
    headerTitleStyle: { fontFamily: theme.syn.typography.font.regular },
  }
}

export function getScreenOptions(
  theme: DefaultTheme,
): BottomTabNavigationOptions {
  return {
    ...getHeaderScreenOptions(theme),
    tabBarStyle: {
      position: `absolute`,
      left: 10,
      bottom: 10,
      right: 10,
      height: 80,
      borderWidth: 2,
      borderTopWidth: 2,
      borderColor: theme.syn.colors.border.disabled,
      borderTopColor: theme.syn.colors.border.disabled,
      borderRadius: 20,
      borderStyle: `solid`,
    },
    tabBarItemStyle: { padding: 10 },
    tabBarLabelStyle: { fontFamily: theme.syn.typography.font.regular },
  } as BottomTabNavigationOptions
}
