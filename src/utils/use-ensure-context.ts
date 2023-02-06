import { Context, useContext } from 'react'

export function useEnsureContext<T>(
  context: Context<T>,
  providerName: string,
  consumerName: string,
): T {
  let res = null
  const errorMsg = `\`${consumerName}\` must be used within \`<${providerName}>\`\n`
  try {
    res = useContext(context)
  } catch (e) {
    throw new Error(`${errorMsg}${e}`)
  }

  if (!res) {
    throw new Error(errorMsg)
  }

  return res
}
