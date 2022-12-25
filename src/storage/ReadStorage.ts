import { LocalStored } from './LocalStored'

export interface ReadPayload {
  book: string
  chapter: number
  verse: number
}

class ReadStorage extends LocalStored<ReadPayload | null> {
  key = `Read`
  get default() {
    return null
  }
}

export default new ReadStorage()
