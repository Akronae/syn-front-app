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
