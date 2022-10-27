import { DrawerScreenProps } from '@react-navigation/drawer'
import { useContext } from 'react'
import * as React from 'react-native'
import styled from 'styled-components/native'
import { Base } from '~/components/Base'
import { View } from '~/components/View'
import { Verse } from '~/components/Verse'
import { BookContext } from '~/contexts/BookContext'
import { ReadChapterDrawerParamList } from './ReadChapterIndex'

export type ReadChapterProps = DrawerScreenProps<ReadChapterDrawerParamList, `Index`>

export function ReadChapter(props: ReadChapterProps) {
  const book = useContext(BookContext)

  return (
    <ReadChapterBase>
      <ScrollView>
        <View gap={40} childRendering={{interval: 50, instantForFirst: 5}}>
          {book.versesParsed.map((verse, i) => (
            <Verse key={i} verse={verse} />
          ))}
        </View>
      </ScrollView>
    </ReadChapterBase>
  )
}

const ReadChapterBase = styled(Base)`
  flex: 1;
`

const ScrollView = styled(React.ScrollView)`
  padding: 20px;
  padding-top: 50px;
  background-color: ${(p) => p.theme.colors.surface.primary};
`
