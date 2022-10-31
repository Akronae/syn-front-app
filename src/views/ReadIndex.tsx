import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { Base } from '~/components/Base'
import { ReadBook } from './ReadBook'
import { getHeaderScreenOptions, RootStackParamList } from '~/router'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import text from '~/assets/text'
import { useState } from '~/utils/react/useState'

export type ReadChapterDrawerParamList = {
  [key in keyof typeof text.NT]: { chapter: number }
}
const Drawer = createDrawerNavigator<ReadChapterDrawerParamList>()

export type ReadIndexProps = BottomTabScreenProps<RootStackParamList, `Read`>

export function ReadIndex(props: ReadIndexProps) {
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
    <ReadIndexBase>
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
    </ReadIndexBase>
  )
}

const ReadIndexBase = styled(Base)`
  flex: 1;
`
