import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { RootStackParamList, getScreenOptions } from 'src/router/router-config'
import { Home } from 'src/views/home'
import { Read } from 'src/views/read/index'
import { useTheme } from 'styled-components/native'

export const Tab = createBottomTabNavigator<RootStackParamList>()

export function Router() {
  const theme = useTheme()
  const bottomTabNavigationOptions = getScreenOptions(theme)

  const navigationContainerTheme = {
    dark: theme.dark,
    colors: {
      primary: theme.colors.surface.primary,
      background: theme.colors.surface.default,
      card: theme.colors.surface.default,
      text: theme.colors.text.primary,
      border: theme.colors.surface.disabled,
      notification: theme.colors.surface.sub,
    },
  }

  return (
    <NavigationContainer
      theme={navigationContainerTheme}
      linking={{ prefixes: [``] }}
    >
      <Tab.Navigator
        screenOptions={{
          ...bottomTabNavigationOptions,
        }}
      >
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
