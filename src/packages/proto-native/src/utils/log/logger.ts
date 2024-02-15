import { EventEmitter } from '@proto-native/utils/event-emitter'

export class Logger {
  private eventEmitter = new EventEmitter()

  public on = {
    error: (callback: (arg: [string, Error]) => void) => {
      this.eventEmitter.addListener(`error`, callback)
    },
    info: (callback: (msg: any[]) => void) => {
      this.eventEmitter.addListener(`info`, callback)
    },
  }

  error(msg: string, err?: Error) {
    console.error(msg, err)
    this.eventEmitter.emit(`error`, [msg, err])
  }

  info(...msg: any[]) {
    console.info(...msg)
    this.eventEmitter.emit(`info`, msg)
  }

  warn(...msg: any[]) {
    console.warn(...msg)
  }
}
