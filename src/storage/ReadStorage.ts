import { LocalStored } from './LocalStored'

export interface ReadPayload {
  book: string
  chapter: number
}

export class ReadStorage extends LocalStored<ReadPayload> {
  key = `Read`
}

export default new ReadStorage()
