import React, { useMemo } from 'react'

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
          (typeof child.type != `string` && child.type.extends === type))
      )
        taken.push(child as React.ReactElement<T>)
      else if (child) left.push(child)
    })
    return { taken, left }
  }, [children, type])
}
