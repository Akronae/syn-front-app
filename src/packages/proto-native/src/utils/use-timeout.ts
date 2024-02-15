import { useEffect, useRef } from 'react'

export function useTimeout(
  callback: (interval: ReturnType<typeof setTimeout>) => void,
  delay?: number,
  deps: any[] = [],
) {
  const savedCallback =
    useRef<(interval: ReturnType<typeof setTimeout>) => void>()
  const intervalId = useRef<ReturnType<typeof setTimeout>>()

  const clear = () => clearTimeout(intervalId.current)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay !== null) {
      intervalId.current = setTimeout(() => {
        if (savedCallback.current && intervalId.current) {
          savedCallback.current(intervalId.current)
        }
      }, delay)
      return () => clear()
    }
  }, [delay, ...deps])

  return { clear }
}
