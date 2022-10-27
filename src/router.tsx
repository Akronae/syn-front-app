

import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import { BookContext } from './contexts/BookContext'
import { ReadChapter } from './views/ReadChapter'
import React, { useContext } from 'react'
import { Home } from './views/Home'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

export type RootStackParamList = {
  Home: undefined
  ReadChapter: undefined
  Feed: { sort: `latest` | `top` } | undefined
}

export const Tab = createBottomTabNavigator()

const tabScreenOptions: BottomTabNavigationOptions = {
  headerTintColor: `#fff`,
  headerTitleStyle: { fontWeight: `bold` },
  tabBarStyle: {
    height: 80,
  },
  tabBarItemStyle: { padding: 10 },
}

export function Router() {
  const book = useContext(BookContext)
  const theme = useTheme()

  const navigationContainerTheme = {
    dark: theme.dark,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text.primary,
      border: theme.colors.border,
      notification: theme.colors.notification,
    },
  }

  return (
    <NavigationContainer theme={navigationContainerTheme} linking={{prefixes: [``]}}>
      <Tab.Navigator screenOptions={{...tabScreenOptions}}>
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
          name='ReadChapter'
          component={ReadChapter}
          options={{
            headerTitle: `${book.book} ${book.versesParsed[0].chapter}`,
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
