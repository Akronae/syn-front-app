import { FormFieldState } from './form-field'
import { FormHandle } from './form-handle'

export function useFormValidate() {
  return (fieldElems: React.ReactElement[], handle: FormHandle) => {
    let isFormValid = true

    fieldElems.forEach((field) => {
      if (field.props.validate) {
        const fieldElemHandle = handle.fields[field.props.name]

        const valid = field.props.validate(fieldElemHandle?.input?.state ?? ``)
        if (!valid) {
          isFormValid = false
          if (fieldElemHandle) {
            fieldElemHandle.state.state = FormFieldState.Error

            // I'm not particularly proud of that.
            // turns out it's the only way to update `fieldElemHandle`
            // as the state update comes from outside the component
            handle.rerender()
          }
        }
      }
    })

    return isFormValid
  }
}
