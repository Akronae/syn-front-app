import { useEffect, useRef } from 'react'

export function useInterval(
  callback: (interval: ReturnType<typeof setInterval>) => void,
  delay?: number,
  deps: any[] = [],
) {
  const savedCallback =
    useRef<(interval: ReturnType<typeof setInterval>) => void>()
  const intervalId = useRef<ReturnType<typeof setInterval>>()

  const clear = () => clearInterval(intervalId.current)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay !== null) {
      intervalId.current = setInterval(() => {
        if (savedCallback.current && intervalId.current) {
          savedCallback.current(intervalId.current)
        }
      }, delay)
      return () => clear()
    }
  }, [delay, ...deps])

  return { clear }
}
