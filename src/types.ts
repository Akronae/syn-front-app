export enum GrammaticalCase {
  Nominative = `nominative`,
  Genitive = `genitive`,
  Dative = `dative`,
  Accusative = `accusative`,
  Vocative = `vocative`,
}

export enum PartOfSpeech {
  NounCommon = `noun_common`,
  NounProper = `noun_proper`,
  PronounRelative = `pronoun_relative`,
  PronounInterrogative = `pronoun_interrogative`,
  PronounIndefinite = `pronoun_indefinite`,
  PronounReciprocal = `pronoun_reciprocal`,
  PronounReflexive = `pronoun_reflexive`,
  PronounDemonstrative = `pronoun_demonstrative`,
  PronounPersonal = `pronoun_personal`,
  Verb = `verb`,
  Adjective = `adjective`,
  Adverb = `adverb`,
  Preposition = `preposition`,
  Conjunction = `conjunction`,
  Interjection = `interjection`,
  Particle = `particle`,
  Participle = `participle`,
  Numeral = `numeral`,
  ArticleDefinite = `article_definite`,
  ArticleIndefinite = `article_indefinite`,
  Determiner = `determiner`,
}

export type Number = 'singular' | 'plural'
export type Gender = 'masculine' | 'feminine' | 'neuter'

export type Declension = {
  case?: GrammaticalCase
  number?: number
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
