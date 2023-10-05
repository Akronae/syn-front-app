import { Base, BaseProps } from '@proto-native/components/base'
import { useInterval, useState } from '@proto-native/utils'
import { isWeb } from '@proto-native/utils/device/is-web'
import { computeThemeValue } from '@proto-native/utils/theme/compute-theme-value'
import { ThemeValue } from '@proto-native/utils/theme/theme-value'
import { castArray } from 'lodash-es'
import { Children, useMemo } from 'react'
import * as Native from 'react-native'
import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { ViewStyle } from 'react-native'

export interface ViewProps extends BaseProps {
  gap?: ThemeValue<number>
  childRendering?: { instant?: { first?: number }; interval?: { ms: number } }
}

export function View(props: ViewProps) {
  const {
    children,
    gap: gapProps,
    childRendering,
    style: styleProps,
    ...passed
  } = props
  const theme = useTheme()
  const gap = computeThemeValue(gapProps, theme)

  const computeChildrenToRenderCount = () => {
    if (!childRendering) return Children.count(children)
    else if (childRendering?.instant?.first) {
      return childRendering.instant.first
    } else return 0
  }
  const childrenToRenderCount = useState(computeChildrenToRenderCount())
  React.useEffect(() => {
    childrenToRenderCount.state = computeChildrenToRenderCount()
  }, [childRendering, children])

  const flatChildren = useMemo(() => {
    return castArray(children)
      .filter((c) => !!c)
      .flatMap((e, i, arr) => {
        if (i >= childrenToRenderCount.state) return []

        return [e]
      })
  }, [children, childrenToRenderCount, childRendering])

  if (!childRendering) {
    childrenToRenderCount.state = flatChildren.length
  }

  useInterval((id) => {
    if (childrenToRenderCount.state >= flatChildren.length) {
      clearInterval(id)
    }
    childrenToRenderCount.state += 1
  }, childRendering?.interval?.ms)

  const style = Native.StyleSheet.flatten([
    styleProps,
    { gap: gap || Native.StyleSheet.flatten(styleProps)?.gap },
  ])

  return (
    <Base {...passed} style={[BaseStyle, style]}>
      {flatChildren}
    </Base>
  )
}

  // @ts-ignore
  const BaseStyle: ViewStyle = {
  ...(isWeb() && { minHeight: `revert`, minWidth: `revert` }),
}
