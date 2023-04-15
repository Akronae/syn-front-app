import { Base, themed, useState } from '@proto-native'
import { View } from '@proto-native'
import * as React from 'react'

import BooksReadStorage from 'src/storage/books-read-stored'
import { WordDetails } from 'src/components/word-details'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import text from 'src/assets/text'
import * as Types from 'src/types'
import { Button } from 'src/components/button'
import { findByKey } from 'src/utils/object/find-by-key'


import * as RNGH from 'react-native-gesture-handler'


import { VerseScrollView } from 'src/components/verse/verse-scrollview'

export type ReadVerseParams = {
  collection: string
  book: string
  chapter: string
  verse: string
}

export default function ReadVerse() {
  const router = useRouter()
  const params = useSearchParams<ReadVerseParams>() as ReadVerseParams
  const focusedWord = useState<string | undefined>(undefined)
  const collection = findByKey<Types.collection>(text, params.collection)
  const book = findByKey<Types.Book>(collection, params.book as string)
  const chapter = findByKey<Types.Chapter>(book, params.chapter as string)
  const verse = findByKey<Types.Verse>(
    chapter?.versesParsed,
    (parseInt(params.verse) - 1).toString(),
  )

  const scrollview = React.useRef<RNGH.ScrollView>(null)

  if (!book || !verse) return null

  BooksReadStorage.merge([
    {
      collection: params.collection,
      book: params.book,
      chapter: verse.chapter,
      verse: verse.verseNumber,
      firstReadDate: new Date().toUTCString(),
      lastReadDate: new Date().toUTCString(),
      read: true,
    },
  ])

  const goToChapter = (chapter: number, verse: number) => {
    const c = book[chapter]
    if (verse < 0) {
      verse = c.versesParsed.length + verse + 1
    }
    if (verse > c.versesParsed.length) {
      verse = 1
      chapter = chapter + 1
    }
    if (chapter > Object.values(book).length) {
      return router.push(`/`)
    }
    router.setParams({ chapter: chapter.toString(), verse: verse.toString() })
    scrollview.current?.scrollTo({ x: 0, y: 0, animated: true })
  }

  const goNext = () => {
    goToChapter(verse.chapter, verse.verseNumber + 1)
  }
  const goBack = () => {
    if (verse.verseNumber === 1) return goToChapter(verse.chapter - 1, -1)
    else goToChapter(verse.chapter, verse.verseNumber - 1)
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
          title: `${verse.book} ${verse.chapter}:${verse.verseNumber}`,
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
