import { View } from '@proto-native/components/view'
import { Base } from '@proto-native/components/base'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import {
  DEFAULT_BONE_COLOR,
  DEFAULT_DURATION,
  DEFAULT_HIGHLIGHT_COLOR,
  LoaderContainerProps,
  LoaderItemProps,
  LoaderProps,
  LoaderViewProps,
} from './skeleton-loader-constants'

export function SkeletonLoader(props: LoaderProps) {
  const {
    children,
    duration = DEFAULT_DURATION,
    boneColor = DEFAULT_BONE_COLOR,
    highlightColor = DEFAULT_HIGHLIGHT_COLOR,
    style,
  } = props

  const progress = useSharedValue(0)

  React.useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration }), -1, true)
  }, [])

  const getChildren = React.useCallback(
    (element: JSX.Element | JSX.Element[]) => {
      return React.Children.map(
        element,
        (child: JSX.Element, index: number) => {
          if (
            child.type.name !== SkeletonLoader.Item.name &&
            child.type.name !== SkeletonLoader.Container.name
          ) {
            return child
          }

          if (child.props.children) {
            return (
              <View key={index} style={child.props.style}>
                {getChildren(child.props.children)}
              </View>
            )
          }

          const style = {
            backgroundColor: highlightColor,
            ...child.props.style,
          }

          return (
            <PulseView
              progress={progress}
              style={style}
              boneColor={boneColor}
              highlightColor={highlightColor}
            />
          )
        },
      )
    },
    [],
  )

  return (
    <Base {...props} style={[styles.container, style]}>
      {getChildren(children)}
    </Base>
  )
}

SkeletonLoader.Item = function SkeletonLoaderItem({
  style,
  ...props
}: LoaderItemProps) {
  return <View style={style} {...props} />
}

SkeletonLoader.Container = function SkeletonLoaderContainer({
  children,
  style,
  ...props
}: LoaderContainerProps) {
  return (
    <View style={style} {...props}>
      {children}
    </View>
  )
}

const PulseView = (props: LoaderViewProps) => {
  const progress = useDerivedValue(() => props.progress.value)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [
          props.boneColor || DEFAULT_BONE_COLOR,
          props.highlightColor || DEFAULT_HIGHLIGHT_COLOR,
        ],
      ),
    }
  }, [])

  return <Animated.View style={[styles.skeleton, props.style, animatedStyle]} />
}

const styles = StyleSheet.create({
  container: {
    overflow: `hidden`,
  },
  skeleton: {
    height: `100%`,
    width: `100%`,
  },
})
