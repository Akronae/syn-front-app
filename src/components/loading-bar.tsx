import { Base, BaseProps } from '@proto-native/components/base'
import {
  ReactiveState,
  useExistingStateOr,
  useInterval,
  useState,
} from '@proto-native/utils'
import { themed } from '@proto-native/utils/theme/themed'
import { useTimeout } from '@proto-native/utils/use-timeout'
import * as React from 'react'
import { ParticleEmitter } from './particle-emitter'
import { Modal } from './modal'

export type LoadingBarProps = BaseProps & {
  progress?: ReactiveState<number> | number
  fake?: {
    delay?: number
    speed?: number
    progress: number
  }
}

export function LoadingBar(props: LoadingBarProps) {
  const { progress: progressProps, fake, ...passed } = props
  const progress =
    progressProps instanceof ReactiveState
      ? useExistingStateOr(progressProps, 0)
      : useState(progressProps ?? 0)

  useInterval(
    () => {
      if (fake?.progress) {
        progress.state +=
          (fake.progress - progress.state) / (1 / (fake.speed ?? 0.2))
      }
    },
    fake?.delay ?? 2000,
  )

  return (
    <LoadingBarBase {...passed}>
      <Modal>
        <ParticleEmitter />
      </Modal>
      <Outer>
        <Inner progress={progress.state}></Inner>
      </Outer>
    </LoadingBarBase>
  )
}

const LoadingBarBase = themed(Base, (_p) => ({}))

const Outer = themed(Base, (p) => ({
  width: `100%`,
  height: 10,
  backgroundColor: p.theme.proto.colors.surface.sub,
  borderRadius: 10,
}))

const Inner = themed<BaseProps & { progress: number }>(Base, (p) => ({
  width: `${Math.min(100, p.progress * 100)}%`,
  height: `100%`,
  backgroundColor: p.theme.proto.colors.surface.primary,
  borderRadius: p.theme.proto.spacing(1),
  transition: `width 0.3s ease-in-out`,
}))
