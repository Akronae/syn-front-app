import { Base, themed, useState } from '@proto-native'
import { View } from '@proto-native'
import * as React from 'react'

import BooksReadStorage from 'src/storage/books-read-stored'
import { WordDetails } from 'src/components/word-details'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import * as Types from 'src/types'
import { Button } from 'src/components/button'

import * as RNGH from 'react-native-gesture-handler'

import { VerseScrollView } from 'src/components/verse/verse-scrollview'
import { useQuery } from '@tanstack/react-query'
import { api, ApiGetManifestResponse } from 'src/api/api-client'

export type ReadVerseParams = {
  collection: string
  book: string
  chapter: string
  verse: string
}

export default function ReadVerse() {
  const router = useRouter()
  const params = useLocalSearchParams<ReadVerseParams>() as ReadVerseParams
  const focusedWord = useState<Types.Word | undefined>(undefined)

  const verseQuery = useQuery({
    queryKey: [
      `get-verse`,
      params.collection,
      params.book,
      params.chapter,
      params.verse,
    ],
    queryFn: () =>
      api.verses.get(
        params.collection,
        params.book,
        Number(params.chapter),
        Number(params.verse),
      ),
  })

  const manifest = useQuery<ApiGetManifestResponse>({
    queryKey: [`get-manifest`],
    queryFn: () => api.verses.getManifest(),
  })

  const scrollview = React.useRef<RNGH.ScrollView>(null)

  const verse = verseQuery.data?.data
  if (!verse) return null

  BooksReadStorage.merge([
    {
      collection: params.collection,
      book: params.book,
      chapter: verse.chapterNumber,
      verse: verse.verseNumber,
      firstReadDate: new Date().toUTCString(),
      lastReadDate: new Date().toUTCString(),
      read: true,
    },
  ])

  const goTo = (chapter: number, verse: number) => {
    const book = manifest.data?.data.collections
      .find((c) => c.name === params.collection)
      ?.books.find((b) => b.name === params.book)
    if (!book) throw new Error(`book ${params.book} not found`)
    const c = book.chapters.find((c) => c.number === chapter)
    if (!c) throw new Error(`chapter ${chapter} not found`)

    if (verse < 0) {
      verse = c.verses + verse + 1
    }
    if (verse > c.verses) {
      verse = 1
      chapter = chapter + 1
    }
    if (chapter > book.chapters.length) {
      return router.push(`/`)
    }
    router.setParams({ chapter: chapter.toString(), verse: verse.toString() })
    scrollview.current?.scrollTo({ x: 0, y: 0, animated: true })
  }

  const goNext = () => {
    goTo(verse.chapterNumber, verse.verseNumber + 1)
  }
  const goBack = () => {
    if (verse.verseNumber === 1) return goTo(verse.chapterNumber - 1, -1)
    else goTo(verse.chapterNumber, verse.verseNumber - 1)
  }
  const goHome = () => {
    router.push(`/`)
  }

  const onPull = (direction: 'up' | 'down') => {
    if (direction === `up`) goNext()
    else goBack()
  }

  return (
    <ReadChapterBase>
      <Stack.Screen
        options={{
          title: `${verse.book} ${verse.chapterNumber}:${verse.verseNumber}`,
        }}
      />
      <VerseScrollView
        focusedWord={focusedWord}
        verse={verse}
        onPull={onPull}
        ref={scrollview}
      />
      <BottomActions>
        <Button
          onPress={goBack}
          type='text'
          size='sm'
          icon={{ ionicons: `arrow-back` }}
        >
          Back
        </Button>
        <Button
          onPress={goHome}
          type='text'
          icon={{ ionicons: `home` }}
        ></Button>
        <Button
          onPress={goNext}
          type='text'
          size='sm'
          icon={{ ionicons: `arrow-forward`, position: `right` }}
        >
          Next
        </Button>
      </BottomActions>
      <WordDetails word={focusedWord} />
    </ReadChapterBase>
  )
}

const ReadChapterBase = themed(Base, (p) => ({
  flex: 1,
})) as typeof View

const BottomActions = themed(View, (p) => ({
  flexDirection: `row`,
  justifyContent: `space-between`,
  padding: 5,
  borderTopColor: p.theme.syn.colors.border.disabled,
  borderTopWidth: 1,
}))
