import { FormHandle } from './form-handle'
import React from 'react'

const FormContext = React.createContext<FormHandle | null>(null)
export { FormContext }
