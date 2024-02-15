import { FormFieldState } from './form-field-state'
import { FormHandle } from './form-handle'

export function useFormValidate() {
  return async (handle: FormHandle) => {
    let isFormValid = true

    const promises = Object.entries(handle.fields).map(
      async ([fieldName, field]) => {
        if (field.props?.validate) {
          const fieldElemHandle = handle.fields[field.props.name]

          const valid = await field.props.validate(
            fieldElemHandle?.input?.state ?? ``,
          )
          if (!valid) {
            isFormValid = false
            if (fieldElemHandle) {
              fieldElemHandle.state.state = FormFieldState.Error

              // I'm not particularly proud of that.
              // turns out it's the only way to update `fieldElemHandle`
              // as the state update comes from outside the component
              handle.rerender()
            }
          } else {
            if (fieldElemHandle) {
              fieldElemHandle.state.state = FormFieldState.Success
            }
          }
        }
      },
    )

    await Promise.all(promises)

    return isFormValid
  }
}
