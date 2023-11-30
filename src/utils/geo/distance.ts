import { Lenght } from './length'
import { LengthUnit } from './length-unit'
import { Point, PointLong, PointLongToShort } from './point'

export function distance(
  a?: Point | PointLong,
  b?: Point | PointLong,
  unit: LengthUnit = `m`,
): Lenght | undefined {
  if (!a || !b) {
    return undefined
  }
  a = PointLongToShort(a)
  b = PointLongToShort(b)
  if (a.lat == b.lat && a.lng == b.lng) {
    return { value: 0, unit }
  } else {
    const radlat1 = (Math.PI * a.lat) / 180
    const radlat2 = (Math.PI * b.lat) / 180
    const theta = a.lng - b.lng
    const radtheta = (Math.PI * theta) / 180
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == `m`) {
      dist = dist * 1.609344 * 1000
    }
    if (unit == `ft`) {
      dist = dist * 5280
    }
    return { value: dist, unit }
  }
}
