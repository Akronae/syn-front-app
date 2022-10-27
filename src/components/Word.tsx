import * as React from 'react-native'
import { StyleSheet } from 'react-native'
import { Text } from '~/components/Text'
import { View, ExViewProps } from '~/components/View'
import { GrammaticalCase, PartOfSpeech } from '~/types'
import * as Types from '~/types'
import styled from 'styled-components/native'

export interface WordProps extends ExViewProps {
  word: Types.Word
}

export function Word(props: WordProps) {
  const { word, ...passed } = props

  let gramcase
  if (word.parsing.includes(`nom-`)) gramcase = GrammaticalCase.Nominative
  if (word.parsing.includes(`gen-`)) gramcase = GrammaticalCase.Genitive
  if (word.parsing.includes(`dat-`)) gramcase = GrammaticalCase.Dative
  if (word.parsing.includes(`acc-`)) gramcase = GrammaticalCase.Accusative
  if (word.parsing.includes(`voc-`)) gramcase = GrammaticalCase.Vocative
  let pos
  if (word.parsing.includes(`verb`)) pos = PartOfSpeech.Verb
  const isMissing = !gramcase && !pos

  return (
    <WordWrapper
      style={[
        pos && styles[pos],
        gramcase && styles[gramcase],
        isMissing && styles.missing,
      ]}
      {...passed}
    >
      <Greek>{word.greek}</Greek>
      <View>
        <English>{word.english}</English>
        <English>{word.parsing}</English>
      </View>
    </WordWrapper>
  )
}

const English = styled(Text)`
  font-size: 12px;
  color: ${p => p.theme.colors.text.sub};
  text-align: center;
`

const WordWrapper = styled(View)`
  padding: 15px;
  border-radius: 20px;
  margin: 5px;
  align-items: center;
  border-width: 1px;
  border-color: #ffffff18;
  background-color: #1c2434;
`

const Greek = styled(Text)`
  font-size: 20px;
`

export const styles = StyleSheet.create({
  [PartOfSpeech.Adjective]: {
  },
  [PartOfSpeech.Adverb]: {
  },
  [PartOfSpeech.Article]: {
  },
  [PartOfSpeech.Conjunction]: {
  },
  [PartOfSpeech.Determiner]: {
  },
  [PartOfSpeech.Interjection]: {
  },
  [PartOfSpeech.Noun]: {
  },
  [PartOfSpeech.Numeral]: {
  },
  [PartOfSpeech.Particle]: {
  },
  [PartOfSpeech.PersonalPronoun]: {
  },
  [PartOfSpeech.Preposition]: {
  },
  [PartOfSpeech.ProperNoun]: {
  },
  [PartOfSpeech.Pronoun]: {
  },
  [PartOfSpeech.Verb]: {
    backgroundColor: `#6666f917`
  },
  [GrammaticalCase.Accusative]: {
    backgroundColor: `#f7414114`,
  },
  [GrammaticalCase.Dative]: {
    backgroundColor: `#d747d312`,
  },
  [GrammaticalCase.Genitive]: {
    backgroundColor: `#89ff6412`,
  },
  [GrammaticalCase.Nominative]: {
    backgroundColor: `#855a0e33`,
  },
  [GrammaticalCase.Vocative]: {
    backgroundColor: `#ffffff08`,
  },
  missing: {
    backgroundColor: `#1c2434`,
  },
})
