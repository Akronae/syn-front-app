import AsyncStorage from '@react-native-async-storage/async-storage'
import { isArray, isObject } from 'lodash-es'
import { isSpreadable } from 'src/packages/proto-native/src'

export abstract class LocalStored<TPayload> {
  abstract key: string

  abstract get default(): TPayload

  public async set(payload: TPayload): Promise<void> {
    return await AsyncStorage.setItem(this.key, JSON.stringify(payload))
  }

  public async get(): Promise<TPayload | null> {
    const read = await AsyncStorage.getItem(this.key)
    return read ? JSON.parse(read) : null
  }

  public async merge(payload: TPayload): Promise<void> {
    const current = await this.get()
    let merged = payload
    if (isObject(current) && isObject(payload)) {
      merged = { ...current, ...payload }
    }
    return await AsyncStorage.setItem(this.key, JSON.stringify(merged))
  }
}
