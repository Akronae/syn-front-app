import { ReadBook } from './read-book'
import { Base, Button, ButtonType } from '@proto-native'
import { useState } from '@proto-native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react-native'
import text from 'src/assets/text'
import { ChapterContext } from 'src/contexts/ChapterContext'
import {
  RootStackParamList,
  getHeaderScreenOptions,
} from 'src/router/router-config'
import styled, { useTheme } from 'styled-components/native'

export type ReadDrawerParamList = {
  [key: string]: { chapter: number }
}
const Drawer = createDrawerNavigator<ReadDrawerParamList>()

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
      <ChapterContext.Provider value={{ chapter }}>
        <Drawer.Navigator
          screenListeners={{
            drawerItemPress: () => navigate(route.name, (chapter.state = 1)),
          }}
          screenOptions={({ route, navigation }) => ({
            ...(getHeaderScreenOptions(theme) as any),
            headerRight: () => (
              <Button
                onPress={() => navigate(route.name, (chapter.state += 1))}
                type={ButtonType.Text}
              >
                Next
              </Button>
            ),
          })}
        >
          {Object.entries(text.NT).map(([book, bookChapters], i) => (
            <Drawer.Screen
              name={book as keyof ReadDrawerParamList}
              component={ReadBook}
              key={i}
            />
          ))}
        </Drawer.Navigator>
      </ChapterContext.Provider>
    </ReadBase>
  )
}

const ReadBase = styled(Base)`
  flex: 1;
`
