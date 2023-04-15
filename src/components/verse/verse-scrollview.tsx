import { ReactiveState } from '@proto-native'
import { View } from '@proto-native'
import * as React from 'react'

import * as Native from 'react-native'
import { Verse } from 'src/components/verse/verse'
import * as Types from 'src/types'
import {
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler'
import * as RNGH from 'react-native-gesture-handler'
import {
  useSharedValue,
} from 'react-native-reanimated'
import { VerseHeader } from 'src/components/verse/verse-header'
import { PullableView, PullableViewProps } from 'src/components/pullable-view'

export type VerseScrollViewProps = {
  verse: Types.Verse
  focusedWord: ReactiveState<string | undefined>
  onPull?: PullableViewProps['onPull']
}
export const VerseScrollView = React.forwardRef<
  RNGH.ScrollView,
  VerseScrollViewProps
>((props, ref) => {
  const { verse, focusedWord, onPull, ...passed } = props
  const scrollviewFallback = React.useRef<Native.ScrollView>(null)
  const scrollview = ref || scrollviewFallback
  const scrolled = useSharedValue(0)
  const gestureRef = React.useRef()

  const onScroll = (
    e: Native.NativeSyntheticEvent<Native.NativeScrollEvent>,
  ) => {
    scrolled.value =
      e.nativeEvent.contentOffset.y /
      (e.nativeEvent.contentSize.height -
        e.nativeEvent.layoutMeasurement.height)
  }

  const Handler = gestureHandlerRootHOC((handlerProps) => {
    return (
      <RNGH.ScrollView
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 30 }}
        ref={scrollview}
        simultaneousHandlers={[gestureRef]}
        onScroll={onScroll}
        scrollEventThrottle={16}
        {...passed}
        {...handlerProps}
      >
        <VerseHeader verse={verse} />
        <PullableView
          enable={scrolled.value < 0.1 || scrolled.value > 0.99}
          gestureRef={gestureRef}
          onPull={onPull}
        >
          <View gap={40}>
            <Verse verse={verse} focusedWord={focusedWord} />
          </View>
        </PullableView>
      </RNGH.ScrollView>
    )
  })

  return <Handler />
})
VerseScrollView.displayName = 'VerseScrollView'
