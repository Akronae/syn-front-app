import React from 'react'

export function useAsync<T>(fn: () => Promise<T>, deps?: any[]) {
  const [state, setState] = React.useState<{
    loading: boolean
    error: Error | null
    value: T | null
    refresh: () => Promise<void>
      }>({
        loading: true,
        error: null,
        value: null,
        refresh: () => fetch(),
      })

  const fetch: () => Promise<void> = () => {
    return fn()
      .then((value) => {
        const newState = { ...state, loading: false, value }
        if (JSON.stringify(newState) !== JSON.stringify(state)) {
          setState(newState)
        }
      })
      .catch((error) =>
        setState({ ...state, loading: false, value: null, error }),
      )
  }

  React.useEffect(() => {
    fetch()
  }, deps)

  return state
}
