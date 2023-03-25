import { ReactiveState, Text, useExistingStateOr } from '@proto-native'
import { ViewProps, View } from '@proto-native'
import * as React from 'react-native'
import { Word } from 'src/components/word'
import { column } from 'src/styles/column'
import * as Types from 'src/types'
import styled from 'styled-components/native'

export interface VerseProps extends ViewProps {
  verse: Types.Verse
  focusedWord?: ReactiveState<string | undefined>
  onWordClick?: (word: Types.Word) => void
}

export function Verse(props: VerseProps) {
  const {
    children,
    verse,
    focusedWord: focusedWordProps,
    onWordClick,
    ...passed
  } = props
  const focusedWord = useExistingStateOr(focusedWordProps, undefined)

  return (
    <View style={[column]} {...passed}>
      <Text>
        {verse.book} {verse.chapter}:{verse.verseNumber}
      </Text>
      <VerseTranslated>{verse.verseTranslated}</VerseTranslated>
      <VerseWrapper gap={0}>
        {verse.wordsParsed.map((word, i) => (
          <Word
            key={i}
            word={word}
            onPress={() => (focusedWord.state = word.greek)}
          />
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
`

const VerseTranslated = styled(Text)`
  padding-top: 10px;
  padding-bottom: 20px;
  font-size: 14px;
  color: ${(p) => p.theme.syn.colors.text.sub};
`