export type Callback<T> = (arg: T) => void

export class EventEmitter {
  private listeners: { [key: string]: Callback<any>[] } = {}

  addListener<T>(event: string, callback: Callback<T>) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }
  emit<T>(event: string, arg: T) {
    if (!this.listeners[event]) {
      return
    }
    this.listeners[event].forEach((callback) => {
      callback(arg)
    })
  }
  removeListener<T>(event: string, callback: Callback<T>) {
    if (!this.listeners[event]) {
      return
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    )
  }

  createRegister<T>(event: string) {
    const subscribe = (callback: Callback<T>) => {
      this.addListener(event, callback)
      return () => this.removeListener(event, callback)
    }
    const emit = (arg: T) => this.emit(event, arg)

    return { subscribe, emit }
  }
}
