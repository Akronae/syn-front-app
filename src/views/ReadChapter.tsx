import { DrawerScreenProps } from '@react-navigation/drawer'
import * as React from 'react-native'
import styled from 'styled-components/native'
import { Base } from '~/components/Base'
import { View } from '~/components/View'
import { Verse } from '~/components/Verse'
import { Book } from '~/types'
import { useContext } from 'react'
import { BookContext } from '~/contexts/BookContext'

export type ReadChapterProps = DrawerScreenProps<Record<string, any>>

export function ReadChapter(props: ReadChapterProps) {
  const { route } = props
  const book = useContext(BookContext)
  const chapter = book?.[route.name as never] as Book
  if (!chapter) return null

  return (
    <ReadChapterBase>
      <ScrollView>
        <View gap={40} childRendering={{ interval: { ms: 50, skipFirst: 5 } }}>
          {chapter.versesParsed.map((verse, i) => (
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
