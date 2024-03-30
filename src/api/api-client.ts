import axios from 'axios'
import { getEnv } from 'src/utils/env/get-env'
import urljoin from 'proper-url-join'
import { Declension, Verse } from 'src/types'

export const apiClient = axios.create({
  baseURL: urljoin(getEnv(`BACK_URL`), `v1`),
})

export const api = {
  verses: {
    getManifest: () => apiClient.get(`/verses/manifest`),
    get: (collection: string, book: string, chapter: number, verse: number) =>
      apiClient.get<GetVerse>(
        `/verses/${collection}/${book}/${chapter}/${verse}`,
      ),
  },
  lexicon: {
    get: (filter: GetLexiconFilter) =>
      apiClient.get<GetLexicon>(`/lexicon/find`, { params: filter }),
  },
}

export type ApiGetManifestResponse = {
  data: {
    collections: {
      name: string
      books: { name: string; chapters: { number: number; verses: number }[] }[]
    }[]
  }
}

export type GetVerse = Verse

export type GetLexicon = {
  lemma: string
  definitions: GetLexiconDefinition[]
  inflections: WordInflection[]
}

export type GetLexiconDefinition = {
  litteral?: string
  formof?: string
}

export type GetLexiconFilter = {
  lemma?: string
  inflection?: GetLexiconFilterInflection
}

export type GetLexiconFilterInflection = {
  word: string
  declension: Declension
}

export type FormInflection = {
  contracted: string
  uncontracted: string[]
}

export type CaseInflection = {
  nominative?: FormInflection[]
  genitive?: FormInflection[]
  dative?: FormInflection[]
  accusative?: FormInflection[]
  vocative?: FormInflection[]
}

export type NumberInflection = {
  singular?: CaseInflection
  plural?: CaseInflection
}

export type GenderInflection = {
  masculine?: NumberInflection
  feminine?: NumberInflection
  neuter?: NumberInflection
}

export type VerbInflectionTenses = {
  present?: VerbInflectionThemes
  imperfect?: VerbInflectionThemes
  future?: VerbInflectionThemes
  aorist?: VerbInflectionThemes
  aorist_2nd?: VerbInflectionThemes
  perfect?: VerbInflectionThemes
  perfect_2nd?: VerbInflectionThemes
  future_perfect?: VerbInflectionThemes
  pluperfect?: VerbInflectionThemes
}

export type VerbInflectionThemes = {
  thematic?: VerbInflectionContraction
  athematic?: VerbInflectionContraction
}

export type VerbInflectionContraction = {
  contracted: VerbInflectionMoods
  uncontracted: VerbInflectionMoods
}

export type VerbInflectionMoods = {
  indicative?: VerbInflectionVoices
  subjunctive?: VerbInflectionVoices
  optative?: VerbInflectionVoices
  imperative?: VerbInflectionVoices
  infinitive?: VerbInflectionInfinitive
  participle?: VerbInflectionParticiple
  pluperfect?: VerbInflectionVoices
}

export type VerbInflectionParticiple = {
  active?: GenderInflection
  middle?: GenderInflection
  passive?: GenderInflection
}

export type VerbInflectionInfinitive = {
  active?: VerbInflectionForm[]
  middle?: VerbInflectionForm[]
  passive?: VerbInflectionForm[]
}

export type VerbInflectionVoices = {
  active?: VerbInflectionNumbers
  middle?: VerbInflectionNumbers
  passive?: VerbInflectionNumbers
}

export type VerbInflectionNumbers = {
  singular?: VerbInflectionPersons
  dual?: VerbInflectionPersons
  plural?: VerbInflectionPersons
}

export type VerbInflectionPersons = {
  first?: VerbInflectionForm[]
  second?: VerbInflectionForm[]
  third?: VerbInflectionForm[]
}

export type VerbInflectionForm = {
  contracted: string
  uncontracted: string[]
}

export type WordInflection = {
  dialect: string[]
  noun?: GenderInflection
  article?: GenderInflection
  pronoun?: GenderInflection
  verb?: VerbInflectionTenses
}
