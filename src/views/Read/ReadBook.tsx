import { DrawerScreenProps } from '@react-navigation/drawer'
import * as React from 'react-native'
import styled from 'styled-components/native'
import { Base } from '@proto-native/base'
import { ReadChapterDrawerParamList } from './Read'
import text from 'src/assets/text'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ReadChapter } from './ReadChapter'
import { BookContext } from 'src/contexts/BookContext'

export type StackType = Record<string, any>
const Stack = createNativeStackNavigator<StackType>()

export type ReadBookProps = DrawerScreenProps<ReadChapterDrawerParamList>

export function ReadBook(props: ReadBookProps) {
  const { route } = props
  const book = (text as any).NT[route.name]

  return (
    <ReadBookBase>
      <BookContext.Provider value={book}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {Object.entries(book).map(([chapter, bookChapter], i) => (
            <Stack.Screen
              name={chapter as never}
              component={ReadChapter}
              key={i}
            />
          ))}
        </Stack.Navigator>
      </BookContext.Provider>
    </ReadBookBase>
  )
}

const ReadBookBase = styled(Base)`
  flex: 1;
`
