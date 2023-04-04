import { useRouter } from 'expo-router'
import text from 'src/assets/text'
import { Title, TitleProps } from 'src/components/title'
import { View, Text, useAsync } from 'src/packages/proto-native/src'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'
import BooksReadStorage from 'src/storage/BooksReadStorage'

function BookThumbs() {
  const router = useRouter()
  const booksRead = useAsync(async () => await BooksReadStorage.get())

  if (booksRead.loading) return null

  return (
    <View gap={(t) => t.syn.spacing(4)}>
      {Object.keys(text.NT).map((bookName) => {
        const book = text.NT[bookName as keyof typeof text.NT]
        const last = booksRead.value?.[BooksReadStorage.getKey('nt', bookName)]
        return (
          <BookThumb
            key={bookName}
            onPress={() => {
              router.push(`/read/nt/${bookName}/${last?.chapter ?? 1}/${last?.verse ?? 1}`)
            }}
          >
            <Title size='h5'>{bookName}</Title>
            <BookThumbDesc>
              Read {last?.chapter ?? 0} out of {Object.keys(book).length} chapters
            </BookThumbDesc>
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

const BookThumb = themed(View, (p) => ({
  backgroundColor: p.theme.syn.colors.surface.sub,
  padding: p.theme.syn.spacing(4),
  borderRadius: p.theme.syn.spacing(4),
})) as typeof View

const BookThumbDesc = themed(Text, (p) => ({
  fontSize: p.theme.syn.typography.size.xs,
}))
