import { Base, themed, useState } from '@proto-native'
import { View } from '@proto-native'
import * as React from 'react'

import * as Native from 'react-native'
import { Verse } from 'src/components/verse'
import BooksReadStorage from 'src/storage/books-read-stored'
import { WordDetails } from 'src/components/word-details'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import text from 'src/assets/text'
import * as Types from 'src/types'
import { Button } from 'src/components/button'
import { findByKey } from 'src/utils/object/find-by-key'

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

  const goToVerse = (verse: number) => {
    router.setParams({ verse: verse.toString() })
  }
  const goToChapter = (chapter: number, verse: number) => {
    if (verse < 0) {
      const c = book[chapter - 1]
      verse = c.versesParsed.length - verse
    }
    router.setParams({ chapter: chapter.toString(), verse: verse.toString() })
  }

  const goNext = () => {
    goToVerse(verse.verseNumber + 1)
  }
  const goBack = () => {
    if (verse.verseNumber === 1) return goToChapter(verse.chapter - 1, -1)
    else goToVerse(verse.verseNumber - 1)
  }
  const goHome = () => {
    router.push(`/`)
  }

  return (
    <ReadChapterBase>
      <Stack.Screen
        options={{
          title: `${verse.book} ${verse.chapter}:${verse.verseNumber}`,
        }}
      />
      <ScrollView>
        <View gap={40}>
          <Verse verse={verse} focusedWord={focusedWord} />
        </View>
      </ScrollView>
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
}))

const ScrollView = themed(Native.ScrollView, (p) => ({
  padding: 20,
  paddingTop: 50,
}))

const BottomActions = themed(View, (p) => ({
  flexDirection: `row`,
  justifyContent: `space-between`,
  padding: 5,
  borderTopColor: p.theme.syn.colors.border.disabled,
  borderTopWidth: 1,
}))
