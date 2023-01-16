import { FormFieldHandle } from './form-field-handle'
import React from 'react'

const FormFieldContext = React.createContext<FormFieldHandle | null>(null)
export { FormFieldContext }
