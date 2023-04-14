import { Base, BaseProps, Text } from '@proto-native'
import * as React from 'react-native'
import { themed } from 'src/packages/proto-native/src/utils/theme/themed'
import * as Types from 'src/types'

export type VerseHeaderProps = BaseProps & {
  verse: Types.Verse
}

export function VerseHeader(props: VerseHeaderProps) {
  const { verse, ...passed } = props

  return (
    <VerseHeaderBase {...passed}>
      <Text>
        {verse.book} {verse.chapter}:{verse.verseNumber}
      </Text>
      <VerseTranslated>{verse.verseTranslated}</VerseTranslated>
    </VerseHeaderBase>
  )
}

const VerseHeaderBase = themed(Base, (p) => ({
  backgroundColor: p.theme.syn.colors.surface.default,
}))

const VerseTranslated = themed(Text, (p) => ({
  paddingTop: 10,
  paddingBottom: 20,
  fontSize: 14,
  color: p.theme.syn.colors.text.sub,
}))
