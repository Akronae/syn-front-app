import { Text, themed } from '@proto-native'
import { ViewProps, View } from '@proto-native'
import * as React from 'react-native'
import { StyleSheet } from 'react-native'
import { GrammaticalCase } from 'src/types'
import * as Types from 'src/types'

export type WordProps = ViewProps & {
  word: Types.Word
}

function posShort(pos: Types.PartOfSpeech) {
  switch (pos) {
    case Types.PartOfSpeech.Adjective:
      return `adjective`
    case Types.PartOfSpeech.Adverb:
      return `adverb`
    case Types.PartOfSpeech.ArticleDefinite:
      return `def. art.`
    case Types.PartOfSpeech.ArticleIndefinite:
      return `indef art.`
    case Types.PartOfSpeech.Conjunction:
      return `conj.`
    case Types.PartOfSpeech.Determiner:
      return `determiner`
    case Types.PartOfSpeech.Interjection:
      return `interjection`
    case Types.PartOfSpeech.NounCommon:
      return `noun`
    case Types.PartOfSpeech.NounProper:
      return `noun (proper)`
    case Types.PartOfSpeech.Numeral:
      return `numeral`
    case Types.PartOfSpeech.Particle:
      return `particle`
    case Types.PartOfSpeech.PronounDemonstrative:
      return `pronoun dem.`
    case Types.PartOfSpeech.PronounIndefinite:
      return `pronoun ind.`
    case Types.PartOfSpeech.PronounInterrogative:
      return `pronoun int.`
    case Types.PartOfSpeech.PronounPersonal:
      return `pronoun pers.`
    case Types.PartOfSpeech.PronounReciprocal:
      return `pronoun rec.`
    case Types.PartOfSpeech.PronounReflexive:
      return `pronoun refl.`
    case Types.PartOfSpeech.PronounRelative:
      return `pronoun rel.`
    case Types.PartOfSpeech.Preposition:
      return `preposition`
    case Types.PartOfSpeech.Verb:
      return `verb`
    case Types.PartOfSpeech.Participle:
      return `participle`
    default:
      throw new Error(`Unknown part of speech: ${pos}`)
  }
}

function caseShort(gramCase: GrammaticalCase) {
  switch (gramCase) {
    case GrammaticalCase.Accusative:
      return `acc`
    case GrammaticalCase.Dative:
      return `dat`
    case GrammaticalCase.Genitive:
      return `gen`
    case GrammaticalCase.Nominative:
      return `nom`
    case GrammaticalCase.Vocative:
      return `voc`
    default:
      throw new Error(`Unknown grammatical case: ${gramCase}`)
  }
}

function numberShort(number: Types.Number) {
  switch (number) {
    case `plural`:
      return `pl`
    case `singular`:
      return `si`
    default:
      throw new Error(`Unknown number: ${number}`)
  }
}

function genderShort(gender: Types.Gender) {
  switch (gender) {
    case `feminine`:
      return `fem`
    case `masculine`:
      return `mas`
  }
}

export function Word(props: WordProps) {
  const { word, ...passed } = props

  const d = word.declension
  const pos = d.partOfSpeech
  const gramCase = d.case
  const isMissing = false
  const de = [
    d.case && caseShort(d.case),
    d.number && numberShort(d.number),
    d.gender && genderShort(d.gender),
  ]
  const declStr = `${posShort(pos)}\n${de.filter((x) => !!x).join(`-`)}`

  return (
    <WordWrapper
      gap={5}
      {...passed}
      style={[
        styles[pos],
        gramCase && styles[gramCase],
        isMissing && styles.missing,
        passed.style,
      ]}
    >
      <Greek>{word.text}</Greek>
      <View gap={1}>
        <English>{word.translation[`en`]}</English>
        <English>{declStr}</English>
      </View>
    </WordWrapper>
  )
}

const WordWrapper = themed(View, (p) => ({
  gap: 5,
  padding: 15,
  borderRadius: 20,
  margin: 5,
  alignItems: `center`,
  borderWidth: 1,
  borderColor: `#ffffff18`,
  backgroundColor: `#1c2434`,
  // flexGrow: 1,
}))

const Greek = themed(Text, (p) => ({
  fontSize: 20,
  color: p.theme.syn.colors.text.sub,
  textAlign: `center`,
}))

const English = themed(Text, (p) => ({
  fontSize: 12,
  color: p.theme.syn.colors.text.sub,
  textAlign: `center`,
}))

export const styles = StyleSheet.create({
  [Types.PartOfSpeech.Adjective]: {},
  [Types.PartOfSpeech.Adverb]: {},
  [Types.PartOfSpeech.ArticleDefinite]: {},
  [Types.PartOfSpeech.ArticleIndefinite]: {},
  [Types.PartOfSpeech.Conjunction]: {},
  [Types.PartOfSpeech.Determiner]: {},
  [Types.PartOfSpeech.Interjection]: {},
  [Types.PartOfSpeech.NounCommon]: {},
  [Types.PartOfSpeech.NounProper]: {},
  [Types.PartOfSpeech.Numeral]: {},
  [Types.PartOfSpeech.Particle]: {},
  [Types.PartOfSpeech.PronounDemonstrative]: {},
  [Types.PartOfSpeech.PronounIndefinite]: {},
  [Types.PartOfSpeech.PronounInterrogative]: {},
  [Types.PartOfSpeech.PronounPersonal]: {},
  [Types.PartOfSpeech.PronounReciprocal]: {},
  [Types.PartOfSpeech.PronounReflexive]: {},
  [Types.PartOfSpeech.PronounRelative]: {},
  [Types.PartOfSpeech.Preposition]: {},
  [Types.PartOfSpeech.Participle]: {},
  [Types.PartOfSpeech.Verb]: {
    backgroundColor: `#6666f917`,
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
