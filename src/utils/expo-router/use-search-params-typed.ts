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
    if (params[key] === `string`) {
      if (typeof searchParams[key] !== `string`)
        throw new Error(`Invalid type for '${key}': '${params[key]}'`)
      result[key] = searchParams[key]?.toString()
    } else if (params[key] === `number`) {
      if (Number.isNaN(Number(searchParams[key])))
        throw new Error(`Invalid type for '${key}': '${params[key]}'`)
      result[key] = Number(searchParams[key])
    } else if (params[key] === `string[]`) {
      if (!Array.isArray(searchParams[key]))
        throw new Error(`Invalid type for '${key}': '${params[key]}'`)
      result[key] = searchParams[key]
    } else if (params[key] === `number[]`) {
      if (!Array.isArray(searchParams[key]))
        throw new Error(`Invalid type for '${key}': '${params[key]}'`)
      result[key] = (searchParams[key] as Array<string>).map(Number)
    } else {
      throw new Error(`Invalid type ${params[key]}`)
    }
  }
  return result
}
