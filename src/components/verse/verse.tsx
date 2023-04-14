import { ReactiveState, themed, useExistingStateOr } from '@proto-native'
import { ViewProps, View } from '@proto-native'
import * as React from 'react-native'
import { Word } from 'src/components/word'
import { column } from 'src/styles/column'
import * as Types from 'src/types'

export interface VerseProps extends ViewProps {
  verse: Types.Verse
  focusedWord?: ReactiveState<string | undefined>
}

export function Verse(props: VerseProps) {
  const { children, verse, focusedWord: focusedWordProps, ...passed } = props
  const focusedWord = useExistingStateOr(focusedWordProps, undefined)

  return (
    <View style={[column]} {...passed}>
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

const VerseWrapper = themed(View, (p) => ({
  flex: 1,
  flexDirection: `row`,
  flexWrap: `wrap`,
  alignContent: `flex-start`,
  alignItems: `stretch`,
  rowGap: 4,
  columnGap: 2,
}))
