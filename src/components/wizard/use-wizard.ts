import { ReactiveState, useExistingStateOr } from '@proto-native/utils'
import { useContext, useEffect } from 'react'
import { WizardContext } from './wizard-context'
import { WizardDataBase, WizardHandle } from './wizard-handle'

type SubsetFunctionOf<T extends WizardDataBase<any, any>> = <
  TKey extends keyof T['reactive'],
  TData extends T['reactive'][TKey],
>(
  key: TKey,
  data: TData,
) => {
  wizard: WizardHandle<T>
  stepData: ReactiveState<NonNullable<T['reactive'][TKey]>>
}

function useWizardInternal<
  T extends WizardDataBase<any, any>,
  TKey extends keyof T['reactive'] = keyof T['reactive'],
>(
  key: TKey,
  data: NonNullable<T['reactive'][TKey]>,
): {
  wizard: WizardHandle<T>
  stepData: ReactiveState<NonNullable<T['reactive'][TKey]>>
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

  const stepDataState = useExistingStateOr(
    context.data?.reactive.state?.[key],
    data,
  ) as ReactiveState<NonNullable<T['reactive'][TKey]>>

  useEffect(() => {
    if (context?.data?.reactive.state) {
      context.data.reactive.state = {
        ...context.data.reactive.state,
        [key]: stepDataState.state,
      }
    }
  }, [stepDataState.state])

  return { wizard: context, stepData: stepDataState }
}

export const useWizard = <T extends WizardDataBase<any, any>>() =>
  useWizardInternal as SubsetFunctionOf<T>
