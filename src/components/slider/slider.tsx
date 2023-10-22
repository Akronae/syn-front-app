import { Base, BaseProps } from '@proto-native/components/base'
import {
  themed,
  useState,
  ReactiveState,
  useExistingStateOr,
} from '@proto-native/utils'
import {
  useForm,
  useFormField,
  FormFieldState,
} from '@proto-native/components/form'
import { useEffect, useRef } from 'react'
import * as RNGH from 'react-native-gesture-handler'
import { runOnJS, useSharedValue } from 'react-native-reanimated'
import { clamp } from 'lodash-es'
import { SliderTrack } from './slider-track'
import { SliderGradation } from './slider-gradation'
import * as Haptics from 'expo-haptics'
import { isWeb } from '@proto-native/utils/device/is-web'

const GRADUATIONS_HORIZONTAL_PADDING = 8 * 2

interface ToStringable {
  toString(): React.ReactNode
}

export type SliderProps<T extends ToStringable = number> = BaseProps & {
  values: T[]
  model?: ReactiveState<T | undefined>
}

export function Slider<T extends ToStringable>(props: SliderProps<T>) {
  const { values, model: modelProps, ...passed } = props
  const trackBounds = useState({ x: 0, y: 0, width: 0, height: 0 })
  const gap = useState<number>(0)
  const model = useExistingStateOr(modelProps, values[0])
  const thumbIndex = useSharedValue(
    model.state ? values.indexOf(model.state) : 0,
  )
  const graduationSizes = useRef<{ [index: number]: { width: number } }>({})

  const form = useForm()
  const formField = useFormField()

  if (formField) formField.input = model

  useEffect(() => {
    if (form && formField?.state.state == FormFieldState.Error) {
      formField.state.state = FormFieldState.Normal
      form.rerender()
    }
  }, [model?.state])

  useEffect(
    () =>
      gap.setter(
        (trackBounds.state.width - GRADUATIONS_HORIZONTAL_PADDING * 2) /
          (values.length - 1),
      ),
    [trackBounds],
  )

  const globalPosToIndex = (pageX: number) => {
    const start = pageX - trackBounds.state.x
    let perc =
      (start - GRADUATIONS_HORIZONTAL_PADDING) /
      (trackBounds.state.width - GRADUATIONS_HORIZONTAL_PADDING * 2)
    perc = clamp(perc, 0, 1)
    return Math.round((values.length - 1) * perc)
  }
  const cursorMovedTo = (pageX: number) => {
    const newIndex = globalPosToIndex(pageX)
    if (newIndex !== thumbIndex.value && !isWeb())
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    thumbIndex.value = newIndex
  }
  const cursorEndTo = (pageX: number) => {
    cursorMovedTo(pageX)
    model.state = values[globalPosToIndex(pageX)]
  }

  const pan = RNGH.Gesture.Pan()
    .onChange((e) => {
      runOnJS(() => cursorMovedTo(e.absoluteX))()
    })
    .onEnd((e) => {
      runOnJS(() => cursorEndTo(e.absoluteX))()
    })

  const tap = RNGH.Gesture.Tap()
    .onEnd((e) => {
      runOnJS(() => cursorMovedTo(e.absoluteX))()
    })
    .onEnd((e) => {
      runOnJS(() => cursorEndTo(e.absoluteX))()
    })

  return (
    <SliderBase {...passed}>
      <Wrapper>
        <SliderTrack
          trackBounds={trackBounds}
          gesture={RNGH.Gesture.Race(pan, tap)}
          thumbIndex={thumbIndex}
          gap={gap}
          horizontalPadding={GRADUATIONS_HORIZONTAL_PADDING}
        />
      </Wrapper>
      <Wrapper>
        <GraduationsContainer>
          {values.map((v, i) => (
            <SliderGradation
              onLayout={(e) =>
                (graduationSizes.current = {
                  ...graduationSizes.current,
                  [i]: { width: e.nativeEvent.layout.width },
                })
              }
              key={i}
              val={v.toString()}
              style={{
                left: gap.state * i + GRADUATIONS_HORIZONTAL_PADDING,
                marginLeft: -(graduationSizes.current?.[i]?.width ?? 0) / 2,
              }}
            />
          ))}
        </GraduationsContainer>
      </Wrapper>
    </SliderBase>
  )
}

const SliderBase = themed(Base, () => ({
  marginVertical: 8,
}))

const Wrapper = themed(Base, () => ({
  height: 24,
  marginHorizontal: 8,
}))

const GraduationsContainer = themed<BaseProps>(Base, (p) => ({
  width: `100%`,
  paddingHorizontal: GRADUATIONS_HORIZONTAL_PADDING,
  marginTop: 8,
}))
