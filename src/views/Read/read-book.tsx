import { ReadDrawerParamList } from './read'
import { ReadChapter } from './read-chapter'
import { Base } from '@proto-native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react-native'
import text from 'src/assets/text'
import { BookContext } from 'src/contexts/BookContext'
import styled from 'styled-components/native'

export type ReadBookDrawerParamList = {
  [key: string]: { verse: number }
}
const Stack = createNativeStackNavigator<ReadBookDrawerParamList>()

export type ReadBookProps = DrawerScreenProps<ReadDrawerParamList>

export function ReadBook(props: ReadBookProps) {
  const { route } = props
  const book = (text as any).NT[route.name]

  return (
    <ReadBookBase>
      <BookContext.Provider value={book}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {Object.entries(book).map(([chapter, bookChapter], i) => (
            <Stack.Screen name={chapter} component={ReadChapter} key={i} />
          ))}
        </Stack.Navigator>
      </BookContext.Provider>
    </ReadBookBase>
  )
}

const ReadBookBase = styled(Base)`
  flex: 1;
`
