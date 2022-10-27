import {
  createDrawerNavigator,
} from '@react-navigation/drawer'
import * as React from 'react-native'
import styled from 'styled-components/native'
import { Base } from '~/components/Base'
import { ReadChapter } from './/ReadChapter'
import { RootStackParamList } from '~/router'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import text from '~/assets/text'

export type ReadChapterDrawerParamList = {
  Index: undefined
}
const Drawer = createDrawerNavigator<ReadChapterDrawerParamList>()

export type ReadChapterIndexProps = BottomTabScreenProps<RootStackParamList, `ReadChapterIndex`>

export function ReadChapterIndex(props: ReadChapterIndexProps) {
  return (
    <ReadChapterIndexBase>
      <Drawer.Navigator>
        { Object.entries(text.NT).map(([book], i) => (
          <Drawer.Screen name={book as keyof ReadChapterDrawerParamList} component={ReadChapter} key={i} />
        )) }
      </Drawer.Navigator>
    </ReadChapterIndexBase>
  )
}

const ReadChapterIndexBase = styled(Base)`
  flex: 1;
`
