import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { DefaultTheme } from 'styled-components/native'
import { getHeaderScreenOptions } from './get-header-screen-options'

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
