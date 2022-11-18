import { useEffect, useRef } from 'react'

export function useInterval(
  callback: (interval: ReturnType<typeof setInterval>) => void,
  delay?: number,
  deps: any[] = []
) {
  const savedCallback = useRef<(interval: ReturnType<typeof setInterval>) => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        if (savedCallback.current) {
          savedCallback.current(id)
        }
      }, delay)
      return () => clearInterval(id)
    }
  }, [delay, ...deps])
}