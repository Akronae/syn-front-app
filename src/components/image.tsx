import {
  Base,
  BaseProps,
  takeBaseOwnProps,
} from '@proto-native/components/base'
import { themed } from '@proto-native/utils/theme/themed'
import * as ExpoImage from 'expo-image'
import { isUndefined, pickBy } from 'lodash-es'
import * as Native from 'react-native'

export type ImageProps = BaseProps<
  ExpoImage.ImageStyle,
  ExpoImage.ImageProps
> & {
  size?: Native.DimensionValue
}

export function Image(props: ImageProps) {
  const { source, ...passed } = props
  const imgProps = takeImageOwnProps(passed)
  const baseProps = takeBaseOwnProps(imgProps.rest)

  if (!source) return null

  return (
    <ImageBase {...baseProps.taken}>
      <Img {...baseProps.rest} {...imgProps.taken} source={source} />
    </ImageBase>
  )
}

export function takeImageOwnProps(props: ImageProps) {
  const { style, size, ...rest } = props

  const flattenStyle = Native.StyleSheet.flatten(style)
  const {
    resizeMode,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    width,
    height,
    ...styleRest
  } = flattenStyle
  const styleTaken = pickBy(
    {
      resizeMode,
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      width: width ?? size,
      height: height ?? size,
    },
    (e) => !isUndefined(e),
  )
  if (!styleTaken.resizeMode && (flattenStyle as any).objectFit)
    styleTaken.resizeMode = (flattenStyle as any).objectFit

  return { taken: { style: styleTaken }, rest: { ...rest, style: styleRest } }
}

const ImageBase = Base

const Img = themed<ExpoImage.ImageProps>(ExpoImage.Image, (p) => ({
  width: `100%`,
  height: `100%`,
}))
