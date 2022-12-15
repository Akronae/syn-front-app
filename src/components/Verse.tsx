import { Text } from '@proto-native/text'
import { ExViewProps, View } from '@proto-native/view'
import * as React from 'react-native'
import { Word } from 'src/components/Word'
import { column } from 'src/styles/column'
import * as Types from 'src/types'
import styled from 'styled-components/native'

export interface VerseProps extends ExViewProps {
  verse: Types.Verse
}

export function Verse(props: VerseProps) {
  const { children, verse, ...passed } = props

  return (
    <View style={[column]} {...passed}>
      <Text>
        {verse.book} {verse.chapter}:{verse.verseNumber}
      </Text>
      <VerseTranslated>{verse.verseTranslated}</VerseTranslated>
      <VerseWrapper gap={50}>
        {verse.wordsParsed.map((word, i) => (
          <Word key={i} word={word} />
        ))}
      </VerseWrapper>
      {children}
    </View>
  )
}

const VerseWrapper = styled(View)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: stretch;
  gap: 4px 2px;
  margin: -4px -2px;
`

const VerseTranslated = styled(Text)`
  padding-top: 10px;
  padding-bottom: 20px;
  font-size: 14px;
  color: ${(p) => p.theme.colors.text.sub};
`