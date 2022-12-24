import React from 'react'

export function useAsync<T>(fn: () => Promise<T>, deps: any[] = []) {
  const [state, setState] = React.useState<{
    loading: boolean
    error: Error | null
    value: T | null
    reload: () => Promise<void>
      }>({
        loading: true,
        error: null,
        value: null,
        reload: () => fetch(),
      })

  const fetch: () => Promise<void> = () => {
    return fn()
      .then((value) => setState({ ...state, loading: false, value }))
      .catch((error) =>
        setState({ ...state, loading: false, value: null, error }),
      )
  }

  React.useEffect(() => {
    fetch()
  }, deps)

  return state
}
