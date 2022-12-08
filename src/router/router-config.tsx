import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Theme } from 'src/theme'

export type RootStackParamList = {
  Home: undefined
  Read: Record<string, unknown>
}

export function getHeaderScreenOptions(
  theme: Theme,
): NativeStackNavigationOptions {
  return {
    headerTintColor: theme.colors.text.contrast,
    headerTitleStyle: { fontFamily: theme.typography.font.regular },
  }
}

export function getScreenOptions(theme: Theme): BottomTabNavigationOptions {
  return {
    ...getHeaderScreenOptions(theme),
    tabBarStyle: {
      height: 80,
    },
    tabBarItemStyle: { padding: 10 },
    tabBarLabelStyle: { fontFamily: theme.typography.font.regular },
  } as BottomTabNavigationOptions
}
