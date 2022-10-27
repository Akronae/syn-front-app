import * as React from 'react-native'
import { Text } from '~/components/Text'
import { View, ExViewProps } from '~/components/View'
import { Word } from '~/components/Word'
import { column } from '~/styles/column'
import * as Types from '~/types'
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
      <VerseTranslated>
        {verse.verseTranslated}
      </VerseTranslated>
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
  color: ${p => p.theme.colors.text.sub};
`