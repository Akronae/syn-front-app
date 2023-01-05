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
    headerTintColor: theme.colors.text.contrast,
    headerTitleStyle: { fontFamily: theme.typography.font.regular },
  }
}

export function getScreenOptions(theme: DefaultTheme): BottomTabNavigationOptions {
  return {
    ...getHeaderScreenOptions(theme),
    tabBarStyle: {
      height: 80,
    },
    tabBarItemStyle: { padding: 10 },
    tabBarLabelStyle: { fontFamily: theme.typography.font.regular },
  } as BottomTabNavigationOptions
}
