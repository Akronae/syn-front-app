import { Lenght } from '@proto-native/utils/geo/length'

export function lengthToHuman(lenght: Lenght, precision: number = 1): string {
  if (lenght.unit == `m`) {
    if (lenght.value > 1000) {
      return `${(lenght.value / 1000).toFixed(precision)} km`
    }
    return `${lenght.value.toFixed(precision)} m`
  }
  if (lenght.unit == `ft`) {
    if (lenght.value > 5280) {
      return `${(lenght.value / 5280).toFixed(precision)} mi`
    }
    return `${lenght.value.toFixed(precision)} ft`
  }
  return `${lenght.value} ${lenght.unit}`
}
