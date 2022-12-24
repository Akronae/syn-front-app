import { Base, BaseProps } from '@proto-native/components'
import { useInterval, useState } from '@proto-native/utils'
import { castArray } from 'lodash-es'
import * as React from 'react-native'
import styled from 'styled-components/native'

export interface ExViewProps extends BaseProps {
  gap?: number
  childRendering?: { instant?: { first?: number }; interval?: { ms: number } }
}

export function View(props: ExViewProps) {
  const { children, gap, childRendering, ...passed } = props

  const flatChildren = castArray(children).flatMap((e, i, arr) => [
    e,
    gap && i != arr.length - 1 && <Divider key={i + 100000} gap={gap} />,
  ])

  const renderedChildren = useState(childRendering?.instant?.first ?? 0)

  if (!childRendering && renderedChildren.state !== flatChildren.length) {
    renderedChildren.state = flatChildren.length
  }

  useInterval((id) => {
    renderedChildren.state += 1
    if (renderedChildren.state >= flatChildren.length) {
      clearInterval(id)
    }
  }, childRendering?.interval?.ms)

  return (
    <ViewBase {...passed}>
      {flatChildren.map((c, i) => {
        if (i < renderedChildren.state) {
          return c
        }
      })}
    </ViewBase>
  )
}

const ViewBase = styled(Base)`
  ${(p) => {
    if (React.Platform.OS === `web`)
      return `
        min-height: revert;
        min-width: revert;
      `
  }}
`

const Divider = styled.View<{ gap?: number }>`
  height: ${(p) => p.gap};
`
