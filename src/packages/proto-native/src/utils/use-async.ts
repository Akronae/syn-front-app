import React from 'react'

export function useAsync<T>(fn: () => Promise<T>, deps: any[] = []) {
  const [state, setState] = React.useState<{
    loading: boolean
    error: Error | null
    value: T | null
  }>({
    loading: true,
    error: null,
    value: null,
  })

  React.useEffect(() => {
    fn()
      .then((value) => setState({ loading: false, error: null, value }))
      .catch((error) => setState({ loading: false, error, value: null }))
  }, deps)

  return state
}
