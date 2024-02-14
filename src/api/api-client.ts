import axios from 'axios'
import { getEnv } from 'src/utils/env/get-env'
import urljoin from 'proper-url-join'
import { Declension, Verse } from 'src/types'

export const apiClient = axios.create({
  baseURL: urljoin(getEnv('BACK_URL'), 'v1'),
})

export const api = {
  verses: {
    getManifest: () => apiClient.get('/verses/manifest'),
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
  translation: string
  description: string
}

export type GetLexiconFilter = {
  lemma?: string
  inflection?: GetLexiconFilterInflection
}

export type GetLexiconFilterInflection = {
  word: string
  declension: Declension
}
