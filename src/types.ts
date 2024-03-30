export enum GrammaticalCase {
  Nominative = `nominative`,
  Genitive = `genitive`,
  Dative = `dative`,
  Accusative = `accusative`,
  Vocative = `vocative`,
}

export type PartOfSpeech =
  | `noun_common`
  | `noun_proper`
  | `pronoun_relative`
  | `pronoun_interrogative`
  | `pronoun_indefinite`
  | `pronoun_reciprocal`
  | `pronoun_reflexive`
  | `pronoun_demonstrative`
  | `pronoun_personal`
  | `verb`
  | `adjective`
  | `adverb`
  | `preposition`
  | `conjunction`
  | `interjection`
  | `particle`
  | `participle`
  | `numeral`
  | `article_definite`
  | `article_indefinite`
  | `determiner`

export type Number = 'singular' | 'plural'
export type Gender = 'masculine' | 'feminine' | 'neuter'

export type Declension = {
  case?: GrammaticalCase
  // eslint-disable-next-line @typescript-eslint/ban-types
  number?: Number
  gender?: Gender
  mood?: string
  person?: string
  tense?: string
  voice?: string
  partOfSpeech: PartOfSpeech
  theme?: string
  indeclinable?: boolean
}

export type Word = {
  language: string
  text: string
  translation: Record<string, string>
  declension: Declension
}

export type Verse = {
  collection: string
  book: string
  chapterNumber: number
  verseNumber: number
  translation: Record<string, string>
  words: Word[]
}

export interface Chapter {
  book: string
  versesParsed: Verse[]
}

export type Book = {
  [index: number]: Chapter
}

export type collection = {
  [index: string]: Book
}
