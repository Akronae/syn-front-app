import { Base, themed, useAsync } from '@proto-native'
import { View } from '@proto-native'
import * as React from 'react'

import * as Native from 'react-native'
import {
  Stack,
  usePathname,
  useRouter,
  useSearchParams,
} from 'expo-router'
import text from 'src/assets/text'
import * as Types from 'src/types'
import { findByKey } from 'src/utils/object/find-by-key'
import BooksReadStorage from 'src/storage/books-read-stored'
import { Card } from 'src/components/card'
import { Title } from 'src/components/title'
import { MenuBar } from 'src/components/menu-bar'

export type BookIndexParams = {
  collection: string
  book: string
}

export default function BookIndex() {
  const router = useRouter()
  const path = usePathname()
  const params = useSearchParams<BookIndexParams>() as BookIndexParams
  const collection = findByKey<Types.collection>(text, params.collection)
  const book = findByKey<Types.Book>(collection, params.book as string)
  const booksRead = useAsync(async () => await BooksReadStorage.get())

  if (!book) return null

  const goToVerse = (chapter: number, verse: number) => {
    router.push(`${path}/${chapter}/${verse}`)
  }

  return (
    <BookIndexBase>
      <Stack.Screen
        options={{
          title: `${params.book}`,
        }}
      />
      <ScrollView>
        <Title tStyle={(t) => ({ marginBottom: t.syn.spacing(5) })}>
          {params.book}
        </Title>
        <View gap={15}>
          {Object.entries(book).map(([chapter, c]) => {
            const versesRead = booksRead.value?.filter(
              (b) => b.book === params.book && b.chapter.toString() === chapter,
            )
            const lastVerseRead = versesRead?.sort(
              (a, b) => b.verse - a.verse,
            )[0]
            return (
              <BookThumb
                key={chapter}
                onPress={() =>
                  goToVerse(parseInt(chapter), lastVerseRead?.verse ?? 1)
                }
              >
                <BookThumb.Title>
                  {params.book} {chapter}
                </BookThumb.Title>
                <BookThumb.Description>
                  Read {versesRead?.length} out of {c.versesParsed.length}
                  {` `}
                  verses
                </BookThumb.Description>
              </BookThumb>
            )
          })}
        </View>
      </ScrollView>
      <MenuBar />
    </BookIndexBase>
  )
}

const BookIndexBase = themed(Base, (p) => ({
  flex: 1,
}))

const ScrollView = themed(Native.ScrollView, (p) => ({
  padding: 20,
  paddingTop: 50,
}))

const BookThumb = themed(Card, (p) => ({
  flex: 1,
  flexDirection: `column`,
  padding: 20,
  borderRadius: p.theme.syn.borderRadius(8),
  backgroundColor: p.theme.syn.colors.surface.sub,
})) as typeof Card
