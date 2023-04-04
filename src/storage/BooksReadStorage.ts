import { LocalStored } from './LocalStored'

export interface ReadPayload {
  [key: string]: {
    book: string
    chapter: number
    verse: number
  }
}

class BooksReadStorage extends LocalStored<ReadPayload | null> {
  key = `Read`
  get default() {
    return null
  }

  public getKey(collection: string, book: string) {
    return `${collection}/${book}`.toLowerCase()
  }
}

export default new BooksReadStorage()
