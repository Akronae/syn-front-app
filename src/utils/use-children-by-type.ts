import React, { useMemo } from 'react'
import { getChildrenByType } from './get-children-by-type'

export function useChildrenByType<T>(
  children: React.ReactNode,
  type: React.ElementType<T>,
): { taken: React.ReactElement<T>[]; left: React.ReactNode[] } {
  return useMemo(() => {
    return getChildrenByType(children, type)
  }, [children, type])
}
