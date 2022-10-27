import { useEffect, useRef } from 'react'

export function useInterval(
  callback: (interval: NodeJS.Timer) => void,
  delay?: number,
  deps: any[] = []
) {
  const savedCallback = useRef<(interval: NodeJS.Timer) => void>()

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