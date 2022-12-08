import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { RootStackParamList, getScreenOptions } from 'src/router/router-config'
import { Read } from 'src/views/Read/index'
import { useTheme } from 'styled-components/native'

import { Home } from 'src/views/Home'

export const Tab = createBottomTabNavigator<RootStackParamList>()

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
      linking={{ prefixes: [``], config: { screens: { Home: { path: `/` } } } }}
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
          name='Read'
          component={Read}
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
