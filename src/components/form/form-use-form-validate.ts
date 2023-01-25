import { useForceUpdate } from '@proto-native/utils'
import { FormFieldState } from './form-field'
import { FormHandle } from './form-handle'

export function useFormValidate() {
  const reRender = useForceUpdate()

  return (fields: React.ReactElement[], elems: FormHandle[`elems`]) => {
    let isFormValid = true

    fields.forEach((field) => {
      if (field.props.validate) {
        const fieldElemHandle = elems[field.props.name]

        const valid = field.props.validate(fieldElemHandle?.input?.state ?? ``)
        if (!valid) {
          isFormValid = false
          if (fieldElemHandle) {
            fieldElemHandle.state.state = FormFieldState.Error

            // I'm not particularly proud of that.
            // turns out it's the only way to update `fieldElemHandle`
            // as the state update comes from outside the component
            reRender()
          }
        }
      }
    })

    return isFormValid
  }
}
