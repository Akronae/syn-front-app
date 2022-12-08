import { Base } from '@proto-native/base'
import { useState } from '@proto-native/use-state'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react-native'
import { RootStackParamList, getHeaderScreenOptions } from 'src/router/router-config'
import text from 'src/assets/text'
import styled, { useTheme } from 'styled-components/native'

import { ReadBook } from './ReadBook'

export type ReadChapterDrawerParamList = {
  [key in keyof typeof text.NT]: { chapter: number }
}
const Drawer = createDrawerNavigator<ReadChapterDrawerParamList>()

export type ReadIndexProps = BottomTabScreenProps<RootStackParamList, `Read`>

export function Read(props: ReadIndexProps) {
  const { navigation, route } = props
  const theme = useTheme()
  const chapter = useState(1)

  const navigate = (book: string, chapter: number) => {
    navigation.navigate(route.name, {
      screen: book,
      params: { screen: chapter.toString() },
    })
  }

  return (
    <ReadBase>
      <Drawer.Navigator
        screenListeners={{
          drawerItemPress: () => navigate(route.name, (chapter.state = 1)),
        }}
        screenOptions={({ route, navigation }) => ({
          ...(getHeaderScreenOptions(theme) as any),
          headerRight: () => (
            <React.Button
              title='Next'
              onPress={() => navigate(route.name, (chapter.state += 1))}
            />
          ),
        })}
      >
        {Object.entries(text.NT).map(([book, bookChapters], i) => (
          <Drawer.Screen
            name={book as keyof ReadChapterDrawerParamList}
            component={ReadBook}
            key={i}
          />
        ))}
      </Drawer.Navigator>
    </ReadBase>
  )
}

const ReadBase = styled(Base)`
  flex: 1;
`
