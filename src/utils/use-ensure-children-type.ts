import React, { useMemo } from 'react'

export function useEnsureChildrenType(children: React.ReactNode, type: React.ElementType) {
  useMemo(() => {
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child) || child.type !== type) {
        throw new Error(`Expected children to be of type ${type}`)
      }
    })
  }, [children, type])
}
