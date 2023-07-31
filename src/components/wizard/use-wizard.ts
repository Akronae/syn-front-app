import { ReactiveState, useState } from '@proto-native/utils'
import { useContext } from 'react'
import { WizardContext } from './wizard-context'
import { WizardHandle } from './wizard-handle'

type SubsetFunctionOf<T> = <TKey extends keyof T, TData extends T[TKey]>(
  key: TKey,
  data: TData,
) => {
  wizard: WizardHandle<T>
  stepData: ReactiveState<NonNullable<T[TKey]>>
}

function useWizardInternal<T extends {}, TKey extends keyof T = keyof T>(
  key: TKey,
  data: NonNullable<T[TKey]>,
): {
  wizard: WizardHandle<T>
  stepData: ReactiveState<NonNullable<T[TKey]>>
} {
  let context: WizardHandle<T> | null = null

  try {
    context = useContext(WizardContext)
  } catch (e) {
    throw new Error(`\`useWizard\` must be used within \`Wizard.Body\`\n${e}`)
  }

  if (!context) {
    throw new Error(`\`useWizard\` must be used within \`Wizard.Body\``)
  }

  const stepDataState = useState(context.data?.[key] ?? data)
  if (context.data) context.data[key] = stepDataState.state

  return { wizard: context, stepData: stepDataState }
}

export const useWizard = <T>() => useWizardInternal as SubsetFunctionOf<T>
