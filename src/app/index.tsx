import { useRouter } from 'expo-router'
import text from 'src/assets/text'
import { Card } from 'src/components/card'
import { Title, TitleProps } from 'src/components/title'
import { View, useAsync } from 'src/packages/proto-native/src'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'
import BooksReadStorage from 'src/storage/books-read-stored'

function BookThumbs() {
  const router = useRouter()
  const booksRead = useAsync(async () => await BooksReadStorage.get())

  if (booksRead.loading) return null

  return (
    <View gap={(t) => t.syn.spacing(4)}>
      {Object.keys(text.NT).map((bookName) => {
        const book = text.NT[bookName as keyof typeof text.NT]
        const bookVersesRead = booksRead.value?.filter(
          (b) => b.book === bookName,
        )
        const bookChaptersRead = Array.from(
          new Set(bookVersesRead?.map((b) => b.chapter)),
        )
        return (
          <BookThumb
            key={bookName}
            onPress={() => {
              router.push(`/read/nt/${bookName}`)
            }}
          >
            <BookThumb.Title>{bookName}</BookThumb.Title>
            <BookThumb.Description>
              Read {bookChaptersRead.length} out of {Object.keys(book).length}{` `}
              chapters
            </BookThumb.Description>
          </BookThumb>
        )
      })}
    </View>
  )
}

export default function AppIndex() {
  return (
    <Page gap={(t) => t.syn.spacing(10)}>
      <PageTitle>
        Syneidesis
        <PageTitle.Description>
          is a tool that helps you read Greek
        </PageTitle.Description>
      </PageTitle>
      <View gap={(t) => t.syn.spacing(4)}>
        <GetStartedTitle size='h4'>
          Get started by picking a book
        </GetStartedTitle>
        <BookThumbs />
      </View>
    </Page>
  )
}

const Page = themed(View, (p) => ({
  paddingHorizontal: 20,
  paddingVertical: 40,
})) as typeof View

const PageTitle = themed<TitleProps>(Title, (p) => ({
  color: p.theme.syn.colors.surface.primary,
})) as typeof Title

const GetStartedTitle = themed<TitleProps>(Title, (p) => ({
  // marginTop: p.theme.syn.spacing(10),
}))

const BookThumb = themed(Card, (p) => ({})) as typeof Card
