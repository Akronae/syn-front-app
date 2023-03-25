import React from 'react'
import { FormHandle } from './form-handle'

const FormContext = React.createContext<FormHandle | null>(null)
export { FormContext }
