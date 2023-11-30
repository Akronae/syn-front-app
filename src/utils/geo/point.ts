export type Point = {
  lat: number
  lng: number
}

export type PointLong = {
  latitude: number
  longitude: number
}

export function PointLongToShort(p: PointLong | Point): Point {
  if (`latitude` in p) {
    return {
      lat: p.latitude,
      lng: p.longitude,
    }
  }
  return p
}
