import { Base, themed, useAsync } from '@proto-native'
import { View } from '@proto-native'
import * as React from 'react'

import * as Native from 'react-native'
import { Stack, usePathname, useRouter, useSearchParams } from 'expo-router'
import BooksReadStorage from 'src/storage/books-read-stored'
import { Card } from 'src/components/card'
import { Title } from 'src/components/title'
import { MenuBar } from 'src/components/menu-bar'
import { useQuery } from '@tanstack/react-query'
import { api, ApiGetManifestResponse } from 'src/api/api-client'
import { capitalize } from 'lodash-es'

export type BookIndexParams = {
  collection: string
  book: string
}

export default function BookIndex() {
  const router = useRouter()
  const path = usePathname()
  const params = useSearchParams<BookIndexParams>() as BookIndexParams
  const booksRead = useAsync(async () => await BooksReadStorage.get())

  const query = useQuery<ApiGetManifestResponse>({
    queryKey: [`get-manifest`],
    queryFn: () => api.verses.getManifest(),
  })
  const book = query.data?.data.collections
    .find((c) => c.name == params.collection)
    ?.books.find((b) => b.name == params.book)

  if (!book) return `no book`

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
          {capitalize(params.book)}
        </Title>
        <View gap={15}>
          {book.chapters.map((chapter) => {
            const versesRead = booksRead.value?.filter(
              (b) => b.book === params.book && b.chapter === chapter.number,
            )
            const lastVerseRead = versesRead?.sort(
              (a, b) => b.verse - a.verse,
            )[0]
            return (
              <BookThumb
                key={chapter.number}
                onPress={() =>
                  goToVerse(chapter.number, lastVerseRead?.verse ?? 1)
                }
              >
                <BookThumb.Title>
                  {capitalize(params.book)} {chapter.number}
                </BookThumb.Title>
                <BookThumb.Description>
                  Read {versesRead?.length} out of {chapter.verses}
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
