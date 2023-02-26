import { useChildrenByType } from './use-children-by-type'
import React from 'react'

export function useGroupChildrenByType<TKeys>(
  children: React.ReactNode,
  types: Record<keyof TKeys, React.ElementType>,
): Record<keyof TKeys | `others`, React.ReactElement[]> {
  const groupped = { others: [] } as Record<any, React.ReactElement[]>
  const grouppedChildren: React.ReactElement[] = []
  Object.entries(types).forEach(([typeName, type]) => {
    groupped[typeName] = []
    const { taken } = useChildrenByType(children, type as React.ElementType)
    groupped[typeName] = taken
    grouppedChildren.push(...taken)
  })

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && !grouppedChildren.includes(child)) {
      groupped.others.push(child)
    }
  })

  return groupped
}
