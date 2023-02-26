import { WizardHandle } from '.'
import React from 'react'

const WizardContext = React.createContext<WizardHandle | null>(null)
export { WizardContext }
