import { useRouter } from 'expo-router'
import { Card } from 'src/components/card'
import { Title, TitleProps } from 'src/components/title'
import { Text, View, useAsync } from 'src/packages/proto-native/src'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'
import BooksReadStorage from 'src/storage/books-read-stored'
import { Button } from 'src/components/button'
import { useQuery } from '@tanstack/react-query'
import { api, ApiGetManifestResponse } from 'src/api/api-client'
import { capitalize } from 'lodash-es'

export default function AppIndex() {
  const router = useRouter()
  const { value: booksRead } = useAsync(
    async () => await BooksReadStorage.get(),
  )
  const lastVerseRead = booksRead?.sort(
    (a, b) =>
      new Date(b.lastReadDate).getTime() - new Date(a.lastReadDate).getTime(),
  )[0]

  return (
    <Page gap={(t) => t.syn.spacing(10)}>
      <PageTitle>
        Syneidesis
        <PageTitle.Description>
          is a tool that helps you read Greek
        </PageTitle.Description>
      </PageTitle>
      {lastVerseRead && (
        <View gap={(t) => t.syn.spacing(4)}>
          <GetBackView gap={(t) => t.syn.spacing(4)}>
            <GetBackTitle>Get back where you left</GetBackTitle>
            <GetBackButton
              size='sm'
              icon={{ ionicons: `arrow-forward`, position: `right` }}
              onPress={() => {
                const l = lastVerseRead
                router.push(
                  `/read/${l.collection}/${l.book}/${l.chapter}/${l.verse}`,
                )
              }}
            >
              {lastVerseRead.book} {lastVerseRead.chapter}:{lastVerseRead.verse}
            </GetBackButton>
          </GetBackView>
        </View>
      )}
      <View gap={(t) => t.syn.spacing(4)}>
        <Title size='h4'>Get started by picking a book</Title>
        <BookThumbs />
      </View>
    </Page>
  )
}

const GetBackView = themed(View, (p) => ({
  backgroundColor: `#301a3a`,
  borderColor: `#5f2d84`,
  borderWidth: 1,
  padding: p.theme.syn.spacing(4),
  borderRadius: p.theme.syn.borderRadius(4),
})) as typeof View

const GetBackTitle = themed(Text.Inherits, (p) => ({
  color: `#bf7af0`,
  fontSize: 18,
  fontWeight: `600`,
}))

const GetBackButton = themed(Button, (p) => ({
  color: `#301a3a`,
  backgroundColor: `#bf7af0`,
  alignSelf: `flex-start`,
  padding: 5,
})) as typeof Button

function BookThumbs() {
  const router = useRouter()
  const booksRead = useAsync(async () => await BooksReadStorage.get())

  const query = useQuery<ApiGetManifestResponse>({
    queryKey: [`get-manifest`],
    queryFn: () => api.verses.getManifest(),
  })

  if (booksRead.loading || !query.data?.data) return null

  const nt = query.data.data.collections.find((c) => c.name == `new_testament`)!

  return (
    <View gap={(t) => t.syn.spacing(4)}>
      {nt.books.map((book) => {
        const bookVersesRead = booksRead.value?.filter(
          (b) => b.book === book.name,
        )
        const bookChaptersRead = Array.from(
          new Set(bookVersesRead?.map((b) => b.chapter)),
        )
        return (
          <BookThumb
            key={book.name}
            onPress={() => {
              router.push(`/read/new_testament/${book.name}` as never)
            }}
          >
            <BookThumb.Title>{capitalize(book.name)}</BookThumb.Title>
            <BookThumb.Description>
              Read {bookChaptersRead.length} out of {book.chapters.length}
              {` `}
              chapters
            </BookThumb.Description>
          </BookThumb>
        )
      })}
    </View>
  )
}

const Page = themed(View, (p) => ({
  paddingHorizontal: 20,
  paddingVertical: 40,
})) as typeof View

const PageTitle = themed<TitleProps>(Title, (p) => ({
  color: p.theme.syn.colors.surface.primary,
})) as typeof Title

const BookThumb = themed(Card, (p) => ({})) as typeof Card
