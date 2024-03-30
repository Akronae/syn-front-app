import { Text, from, themed } from '@proto-native'
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
    case 'adjective':
      return `adjective`
    case 'adverb':
      return `adverb`
    case 'article_definite':
      return `def. art.`
    case 'article_indefinite':
      return `indef art.`
    case 'conjunction':
      return `conj.`
    case 'determiner':
      return `determiner`
    case 'interjection':
      return `interjection`
    case 'noun_common':
      return `noun`
    case 'noun_proper':
      return `noun (proper)`
    case 'numeral':
      return `numeral`
    case 'participle':
      return `particle`
    case 'pronoun_demonstrative':
      return `pronoun dem.`
    case 'pronoun_indefinite':
      return `pronoun ind.`
    case 'pronoun_interrogative':
      return `pronoun int.`
    case 'pronoun_personal':
      return `pronoun pers.`
    case 'pronoun_reciprocal':
      return `pronoun rec.`
    case 'pronoun_reflexive':
      return `pronoun refl.`
    case 'pronoun_relative':
      return `pronoun rel.`
    case 'preposition':
      return `preposition`
    case 'verb':
      return `verb`
    case 'particle':
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
  fontFamily: p.theme.syn.typography.font.greekRegular,
}))

const English = themed(Text, (p) => ({
  fontSize: 12,
  color: p.theme.syn.colors.text.sub,
  textAlign: `center`,
}))

export const styles = StyleSheet.create({
  [from<Types.PartOfSpeech>('adjective')]: {},
  [from<Types.PartOfSpeech>('adverb')]: {},
  [from<Types.PartOfSpeech>('article_definite')]: {},
  [from<Types.PartOfSpeech>('article_indefinite')]: {},
  [from<Types.PartOfSpeech>('conjunction')]: {},
  [from<Types.PartOfSpeech>('determiner')]: {},
  [from<Types.PartOfSpeech>('interjection')]: {},
  [from<Types.PartOfSpeech>('noun_common')]: {},
  [from<Types.PartOfSpeech>('noun_proper')]: {},
  [from<Types.PartOfSpeech>('numeral')]: {},
  [from<Types.PartOfSpeech>('participle')]: {},
  [from<Types.PartOfSpeech>('pronoun_demonstrative')]: {},
  [from<Types.PartOfSpeech>('pronoun_indefinite')]: {},
  [from<Types.PartOfSpeech>('pronoun_interrogative')]: {},
  [from<Types.PartOfSpeech>('pronoun_personal')]: {},
  [from<Types.PartOfSpeech>('pronoun_reciprocal')]: {},
  [from<Types.PartOfSpeech>('pronoun_reflexive')]: {},
  [from<Types.PartOfSpeech>('pronoun_relative')]: {},
  [from<Types.PartOfSpeech>('preposition')]: {},
  [from<Types.PartOfSpeech>('participle')]: {},
  [from<Types.PartOfSpeech>('verb')]: {
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
