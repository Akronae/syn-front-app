import React from 'react'
import { FormFieldHandle } from './form-field-handle'

const FormFieldContext = React.createContext<FormFieldHandle | null>(null)
export { FormFieldContext }
