import { LocalStoredArray } from '@proto-native'

export type ReadPayloadItem = {
  collection: string
  book: string
  chapter: number
  verse: number
  read: boolean
  firstReadDate?: string
  lastReadDate: string
}

class BooksReadStorage extends LocalStoredArray<ReadPayloadItem> {
  key = `syn.read`
  get default() {
    return []
  }

  public getItemHashKey(payload: ReadPayloadItem): string {
    return payload
      ? `${payload.collection}/${payload.book}/${payload.chapter}/${payload.verse}`
      : ``
  }
}

export default new BooksReadStorage()
