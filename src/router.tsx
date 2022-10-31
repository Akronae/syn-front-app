import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import React from 'react'
import { Home } from './views/Home'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'
import { ReadIndex } from './views/ReadIndex'
import { Theme } from './theme'

export type RootStackParamList = {
  Home: undefined
  Read: Record<string, unknown>
}

export const Tab = createBottomTabNavigator<RootStackParamList>()

export function getHeaderScreenOptions(theme: Theme) {
  return {
    headerTintColor: theme.colors.text.contrast,
    // headerTitleStyle: { fontWeight: `bold` },
  }
}

export function getScreenOptions(theme: Theme): BottomTabNavigationOptions {
  return {
    ...getHeaderScreenOptions(theme),
    tabBarStyle: {
      height: 80,
    },
    tabBarItemStyle: { padding: 10 },
  } as BottomTabNavigationOptions
}

export function Router() {
  const theme = useTheme()
  const bottomTabNavigationOptions = getScreenOptions(theme)

  const navigationContainerTheme = {
    dark: theme.dark,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.surface.primary,
      card: theme.colors.surface.primary,
      text: theme.colors.text.primary,
      border: theme.colors.border,
      notification: theme.colors.notification,
    },
  }

  return (
    <NavigationContainer
      theme={navigationContainerTheme}
      linking={{ prefixes: [``] }}
    >
      <Tab.Navigator screenOptions={{ ...bottomTabNavigationOptions }}>
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name='home' size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name='ReadChapterIndex'
          component={ReadIndex}
          options={{
            headerShown: false,
            title: `Read`,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name='book' size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
