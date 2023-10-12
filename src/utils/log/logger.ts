type Callback = (...args: any[]) => void
class EventEmitter {
  private listeners: { [key: string]: Callback[] } = {}

  addListener(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }
  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      return
    }
    this.listeners[event].forEach((callback) => {
      callback(...args)
    })
  }
  removeListener(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      return
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    )
  }
}

export class Logger {
  private eventEmitter = new EventEmitter()

  public on = {
    error: (callback: (msg: string, err?: Error) => void) => {
      this.eventEmitter.addListener(`error`, callback)
    },
    info: (callback: (msg: string) => void) => {
      this.eventEmitter.addListener(`info`, callback)
    },
  }

  error(msg: string, err?: Error) {
    console.error(msg, err)
    this.eventEmitter.emit(`error`, msg, err)
  }

  info(msg: string) {
    console.info(msg)
    this.eventEmitter.emit(`info`, msg)
  }

  warn(msg: string) {
    console.warn(msg)
  }
}
