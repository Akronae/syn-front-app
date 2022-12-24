import { Base } from '@proto-native'
import { View } from '@proto-native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { useEffect } from 'react'
import { useContext } from 'react'
import * as React from 'react-native'
import { Verse } from 'src/components/Verse'
import { BookContext } from 'src/contexts/BookContext'
import { ChapterContext } from 'src/contexts/ChapterContext'
import ReadStorage from 'src/storage/ReadStorage'
import { Book } from 'src/types'
import styled from 'styled-components/native'

export type ReadChapterProps = DrawerScreenProps<Record<string, any>>

export function ReadChapter(props: ReadChapterProps) {
  const { route } = props
  const book = useContext(BookContext)
  const chapterCtx = useContext(ChapterContext)
  const chapter = book?.[route.name as never] as Book
  if (!chapter) return null

  ReadStorage.set({ book: chapter.book, chapter: parseInt(route.name) })

  const onScroll = (e: React.NativeSyntheticEvent<React.NativeScrollEvent>) => {
    console.log(e.nativeEvent, React.Dimensions.get(`screen`))
  }

  useEffect(() => {
    if (chapterCtx) chapterCtx.chapter.state = parseInt(route.name)
  }, [])

  return (
    <ReadChapterBase>
      <ScrollView onScroll={onScroll}>
        <View
          gap={40}
          childRendering={{
            interval: { ms: 500000000000000 },
            instant: { first: 5 },
          }}
        >
          {chapter.versesParsed.map(
            (verse, i) => i < 10 && <Verse key={i} verse={verse} />,
          )}
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
`
