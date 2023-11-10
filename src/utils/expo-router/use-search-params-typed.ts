import { useSearchParams } from 'expo-router'

export function useSearchParamsTyped<
  T extends Record<string, 'string' | 'number' | 'string[]' | 'number[]'>,
>(
  params: T,
): {
  [K in keyof T]: T[K] extends 'string'
    ? string
    : T[K] extends 'number'
    ? number
    : T[K] extends 'string[]'
    ? string[]
    : T[K] extends 'number[]'
    ? number[]
    : never
} {
  const searchParams = useSearchParams()
  const result = {} as any
  for (const key in params) {
    const val = searchParams[key]
    if (params[key] === `string`) {
      if (typeof val !== `string`)
        throw new Error(
          `Invalid type for '${key}': '${params[key]}. Value: '${val}''`,
        )
      result[key] = val?.toString()
    } else if (params[key] === `number`) {
      if (Number.isNaN(Number(val)))
        throw new Error(
          `Invalid type for '${key}': '${params[key]}. Value: '${val}''`,
        )
      result[key] = Number(val)
    } else if (params[key] === `string[]`) {
      if (!Array.isArray(val))
        throw new Error(
          `Invalid type for '${key}': '${params[key]}. Value: '${val}''`,
        )
      result[key] = val
    } else if (params[key] === `number[]`) {
      if (!Array.isArray(val))
        throw new Error(
          `Invalid type for '${key}': '${params[key]}. Value: '${val}''`,
        )
      result[key] = (val as Array<string>).map(Number)
    } else {
      throw new Error(`Invalid type ${params[key]}. Value: '${val}'`)
    }
  }
  return result
}
