import text from 'src/assets/text'
import { Title, TitleProps } from 'src/components/title'
import { View, Text } from 'src/packages/proto-native/src'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'

export default function AppIndex() {
  const BooksThumbs = (
    <View gap={(t) => t.syn.spacing(4)}>
      {Object.keys(text.NT).map((bookName) => {
        const book = text.NT[bookName as keyof typeof text.NT]
        return (
          <BookThumb key={bookName}>
            <Title size='h5'>{bookName}</Title>
            <BookThumbDesc>
              Read 0 out of {Object.keys(book).length} chapters
            </BookThumbDesc>
          </BookThumb>
        )
      })}
    </View>
  )

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
        {BooksThumbs}
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
