import { Base, useState } from '@proto-native'
import { View } from '@proto-native'
import { SkeletonLoader } from '@proto-native'
import * as React from 'react'

import * as Native from 'react-native'
import { Verse } from 'src/components/verse'
import BooksReadStorage from 'src/storage/BooksReadStorage'
import styled from 'styled-components/native'
import { WordDetails } from 'src/components/word-details'
import { Stack, useSearchParams } from 'expo-router'
import text from 'src/assets/text'
import * as Types from 'src/types'

function find<T = any>(
  obj: Record<string, any> | undefined,
  key: string,
): T | undefined {
  if (!obj) return undefined
  const foundKey = Object.keys(obj).find(
    (k) => k.toLowerCase() === key.toLowerCase(),
  )
  if (!foundKey) return undefined
  return obj[foundKey] as T
}

export type ReadVerseParams = {
  collection: string
  book: string
  chapter: string
  verse: string
}

export default function ReadVerse() {
  const params = useSearchParams<ReadVerseParams>() as ReadVerseParams
  const focusedWord = useState<string | undefined>(undefined)
  const collection = find(text, params.collection)
  const book = find(collection, params.book as string)
  const chapter = find<Types.Chapter>(book, params.chapter as string)
  const verse = find<Types.Verse>(
    chapter?.versesParsed,
    (parseInt(params.verse) - 1).toString(),
  )

  const isReady = useState(true)

  if (!verse) return null

  const scrollView = React.useRef<Native.ScrollView>(null)

  BooksReadStorage.merge({
    [BooksReadStorage.getKey(params.collection, params.book)]: {
      book: verse.book,
      chapter: verse.chapter,
      verse: verse.verseNumber,
    },
  })

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

  const d = React.useMemo(() => {
    return <WordDetails word={focusedWord} />
  }, [focusedWord.state])

  return (
    <ReadChapterBase>
      <Stack.Screen
        options={{
          title: `${verse.book} ${verse.chapter}:${verse.verseNumber}`,
        }}
      />
      <ScrollView scrollEventThrottle={1000} ref={scrollView}>
        <SkeletonLoader showIf={!isReady.state}>
          {SkeletonCard()}
          {SkeletonCard()}
          {SkeletonCard()}
          {SkeletonCard()}
        </SkeletonLoader>
        <View
          gap={40}
          childRendering={{
            interval: { ms: 500 },
            instant: { first: 5 },
          }}
        >
          <Verse verse={verse} focusedWord={focusedWord} />
        </View>
      </ScrollView>
      {d}
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
