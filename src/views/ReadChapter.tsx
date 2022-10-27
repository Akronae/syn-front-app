import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useContext } from 'react'
import * as React from 'react-native'
import styled from 'styled-components/native'
import { Base } from '~/components/Base'
import { ExView } from '~/components/ExView'
import { Verse } from '~/components/Verse'
import { BookContext } from '~/contexts/BookContext'
import { RootStackParamList } from '~/router'

export type ReadChapterProps = NativeStackScreenProps<RootStackParamList>

export function ReadChapter(props: ReadChapterProps) {
  const book = useContext(BookContext)

  return (
    <ReadChapterBase>
      <ScrollView>
        <ExView gap={40} childRenderInterval={100}>
          {book.versesParsed.map((verse, i) => (
            <Verse key={i} verse={verse} />
          ))}
        </ExView>
      </ScrollView>
    </ReadChapterBase>
  )
}

const ReadChapterBase = styled(Base)`
  flex: 1;
`

const ScrollView = styled(React.ScrollView)`
  padding: 20px;
  padding-top: 50px;
  background-color: ${(p) => p.theme.colors.background};
`
