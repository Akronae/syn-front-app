import { isArray } from 'lodash-es'
import { LocalStored } from './local-stored'
import AsyncStorage from '@react-native-async-storage/async-storage'

export abstract class LocalStoredArray<TPayloadItem> extends LocalStored<
  TPayloadItem[]
> {
  public abstract getItemHashKey(payload: TPayloadItem): string

  public async merge(payload: TPayloadItem[]): Promise<void> {
    const current = await this.get()

    let merged = null
    if (isArray(current) && isArray(payload)) {
      payload.forEach((p, i) => {
        const sameHash = current.find(
          (c) => this.getItemHashKey(c) === this.getItemHashKey(p),
        )
        if (sameHash) {
          payload[i] = Object.assign(sameHash, p)
          current.splice(current.indexOf(sameHash), 1)
        }
      })
      merged = [...current, ...payload]
    } else {
      merged = payload
    }
    return await AsyncStorage.setItem(this.key, JSON.stringify(merged))
  }
}
