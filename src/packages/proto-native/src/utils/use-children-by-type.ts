import React, { useMemo } from 'react'

type ExtendedElementType<T, T2> = React.ElementType<T> & {
  extends?: React.ElementType<T2>
}

export function useChildrenByType<T>(
  children: React.ReactNode,
  type: React.ElementType<T>,
): { taken: React.ReactElement<T>[]; left: React.ReactNode[] } {
  return useMemo(() => {
    const taken: React.ReactElement<T>[] = []
    const left: React.ReactNode[] = []
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        (child.type === type ||
          (typeof child.type != `string` &&
            (child.type as ExtendedElementType<unknown, unknown>).extends ===
              type))
      )
        taken.push(child as React.ReactElement<T>)
      else if (child) left.push(child)
    })
    return { taken, left }
  }, [children, type])
}
