export enum GrammaticalCase {
  Nominative = `nominative`,
  Genitive = `genitive`,
  Dative = `dative`,
  Accusative = `accusative`,
  Vocative = `vocative`,
}

export enum PartOfSpeech {
  Noun = `Noun`,
  ProperNoun = `ProperNoun`,
  Pronoun = `Pronoun`,
  PersonalPronoun = `PersonalPronoun`,
  Verb = `Verb`,
  Adjective = `Adjective`,
  Adverb = `Adverb`,
  Preposition = `Preposition`,
  Conjunction = `Conjunction`,
  Interjection = `Interjection`,
  Particle = `Particle`,
  Numeral = `Numeral`,
  Article = `Article`,
  Determiner = `Determiner`,
}

export interface Word {
  greek: string
  english: string
  parsing: string
}

export interface Verse {
  book: string
  chapter: number
  verseNumber: number
  wordsParsed: Word[]
  verseTranslated: string
}

export interface Chapter {
  book: string
  versesParsed: Verse[]
}
