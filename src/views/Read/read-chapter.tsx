import { ReadBookDrawerParamList } from './read-book'
import { Base, useInterval, useState } from '@proto-native'
import { View } from '@proto-native'
import { SkeletonLoader } from '@proto-native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { useEffect } from 'react'
import { useContext } from 'react'
import * as React from 'react'
import {
  LayoutRectangle,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'
import * as Native from 'react-native'
import { Verse, VerseProps } from 'src/components/verse'
import { BookContext } from 'src/contexts/BookContext'
import { ChapterContext } from 'src/contexts/ChapterContext'
import ReadStorage from 'src/storage/ReadStorage'
import { Book } from 'src/types'
import styled from 'styled-components/native'
import { WordDetails } from './word-details'

export type ReadChapterProps = DrawerScreenProps<ReadBookDrawerParamList>

export function ReadChapter(props: ReadChapterProps) {
  const { route, navigation } = props
  const book = useContext(BookContext)
  const chapterCtx = useContext(ChapterContext)
  const focusedWord = useState<string | undefined>(undefined)
  const openWordDetails = useState(false)
  useEffect(() => {
    openWordDetails.state = focusedWord.state != null
    if (focusedWord.state)
      return navigation.setParams({ word: focusedWord.state })
    if (route.params?.word) focusedWord.state = route.params.word
  }, [focusedWord.state, route.params?.word])
  const childrenLayouts = useState(
    new Map<React.ReactElement<VerseProps>, LayoutRectangle>(),
  )
  const lastContentChange = useState<number | null>(null)
  const isReady = useState(false)

  const i = useInterval(() => {
    if (!lastContentChange.state || Date.now() - lastContentChange.state < 300)
      return
    isReady.state = true
    if (route.params?.verse) {
      const c = Array.from(childrenLayouts.state)?.[route.params.verse - 1]
      scrollView.current?.scrollTo({ y: c?.[1].y, animated: false })
    }
    i.clear()
  }, 100)

  const verseElems = useState<React.ReactElement<VerseProps>[]>([])
  const chapter = book?.[route.name as never] as Book
  useEffect(() => {
    if (chapterCtx) chapterCtx.chapter.state = parseInt(route.name)
    const v = chapter.versesParsed.map((verse, i) => (
      <Verse
        onLayout={(e) => childrenLayouts.state.set(v[i], e.nativeEvent.layout)}
        key={i}
        verse={verse}
        focusedWord={focusedWord}
      />
    ))
    verseElems.state = v
  }, [])
  const scrollView = React.useRef<Native.ScrollView>(null)

  useInterval(() => {
    scrollView.current
  }, 1000)

  if (!chapter) return null

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrolled = e.nativeEvent.contentOffset.y
    const focusedChildren = []
    for (const [child, layout] of childrenLayouts.state) {
      if (
        layout.y + layout.height > scrolled &&
        layout.y < scrolled + e.nativeEvent.layoutMeasurement.height
      ) {
        focusedChildren.push(child)
      }
    }
    const f = focusedChildren[0]?.props?.verse
    if (!f) return
    ReadStorage.set({ book: f.book, chapter: f.chapter, verse: f.verseNumber })
  }

  const SkeletonCard = () => (
    <SkeletonLoader.Container style={[{ flex: 1, flexDirection: `row` }]}>
      <SkeletonLoader.Item
        style={{
          height: 200,
          borderRadius: 30,
          marginBottom: 30,
        }}
      />
    </SkeletonLoader.Container>
  )

  return (
    <ReadChapterBase>
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={1000}
        ref={scrollView}
        onContentSizeChange={() => (lastContentChange.state = Date.now())}
      >
        <SkeletonLoader showIf={!isReady.state}>
          {SkeletonCard()}
          {SkeletonCard()}
          {SkeletonCard()}
          {SkeletonCard()}
        </SkeletonLoader>
        <View
          gap={{ vertical: 40 }}
          childRendering={{
            interval: { ms: 500000000000000 },
            instant: { first: 5 },
          }}
        >
          {verseElems.state}
        </View>
      </ScrollView>
      <WordDetails word={focusedWord.state} open={openWordDetails} />
    </ReadChapterBase>
  )
}

const ReadChapterBase = styled(Base)`
  flex: 1;
`

const ScrollView = styled(Native.ScrollView)`
  padding: 20px;
  padding-top: 50px;
`
