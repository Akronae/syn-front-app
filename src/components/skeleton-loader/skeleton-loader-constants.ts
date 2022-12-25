import { BaseProps } from '@proto-native'
import Native from 'react-native'
import Animated from 'react-native-reanimated'

export const DEFAULT_BONE_COLOR = `#121212`
export const DEFAULT_HIGHLIGHT_COLOR = `#333333`
export const DEFAULT_DURATION = 500

export interface LoaderProps extends BaseProps {
  children: JSX.Element | JSX.Element[]
  duration?: number
  boneColor?: string
  highlightColor?: string
  style?: Native.ViewStyle
}

export interface LoaderContainerProps extends BaseProps {
  children: JSX.Element | JSX.Element[]
}

export interface LoaderItemProps extends BaseProps {
  style: Native.ViewStyle
}

export interface LoaderViewProps {
  progress: Animated.SharedValue<number>
  style?: Native.ViewStyle
  boneColor?: string
  highlightColor?: string
}
