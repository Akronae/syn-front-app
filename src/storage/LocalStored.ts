import AsyncStorage from '@react-native-async-storage/async-storage'

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
}
