import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import { BookContext } from './contexts/BookContext'
import React, { useContext } from 'react'
import { Home } from './views/Home'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'
import { ReadChapterIndex } from './views/ReadChapterIndex'

export type RootStackParamList = {
  Home: undefined
  ReadChapterIndex: undefined
}

export const Tab = createBottomTabNavigator<RootStackParamList>()

export function Router() {
  const book = useContext(BookContext)
  const theme = useTheme()

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

  const tabScreenOptions: BottomTabNavigationOptions = {
    headerTintColor: theme.colors.text.contrast,
    headerTitleStyle: { fontWeight: `bold` },
    tabBarStyle: {
      height: 80,
    },
    tabBarItemStyle: { padding: 10 },
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
          name='ReadChapterIndex'
          component={ReadChapterIndex}
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

