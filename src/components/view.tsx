import { Base, BaseProps } from '@proto-native/components/base'
import { useInterval, useState } from '@proto-native/utils'
import { computeThemeValue } from '@proto-native/utils/theme/compute-theme-value'
import { ThemeValue } from '@proto-native/utils/theme/theme-value'
import { castArray } from 'lodash-es'
import * as React from 'react-native'
import styled, { css, useTheme } from 'styled-components/native'

export interface ViewProps extends BaseProps {
  gap?: { vertical?: ThemeValue<number>; horizontal?: ThemeValue<number> }
  childRendering?: { instant?: { first?: number }; interval?: { ms: number } }
}

export function View(props: ViewProps) {
  const { children, gap: gapProps, childRendering, ...passed } = props
  const theme = useTheme()
  const gap = {
    vertical: computeThemeValue(gapProps?.vertical, theme),
    horizontal: computeThemeValue(gapProps?.horizontal, theme),
  }
  const renderedChildren = useState(childRendering?.instant?.first ?? 0)

  const flatChildren = castArray(children)
    .filter((c) => !!c)
    .flatMap((e, i, arr) => {
      if (i >= renderedChildren.state) return []

      const hasDivider =
        (gap?.horizontal || gap.vertical) && i != arr.length - 1
      return [e, hasDivider ? <Divider key={i + 100000} gap={gap} /> : null]
    })

  if (!childRendering) {
    renderedChildren.state = flatChildren.length
  }

  useInterval((id) => {
    renderedChildren.state += 1
    if (renderedChildren.state >= flatChildren.length) {
      clearInterval(id)
    }
  }, childRendering?.interval?.ms)

  return <ViewBase {...passed}>{flatChildren}</ViewBase>
}

const ViewBase = styled(Base)`
  ${(p) => {
  if (React.Platform.OS === `web`)
    return `
        min-height: revert;
        min-width: revert;
      `
}}
` as typeof Base

const Divider = styled.View<{
  gap?: { horizontal?: number; vertical?: number }
}>`
  ${(p) =>
    p.gap?.vertical &&
    css`
      height: ${p.gap.vertical}px;
    `}
  ${(p) =>
    p.gap?.horizontal &&
    css`
      width: ${p.gap.horizontal}px;
    `}
`
