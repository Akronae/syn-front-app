import { Base, BaseProps } from '@proto-native/components/base'
import * as React from 'react-native'
import styled from 'styled-components/native'

export type FormFieldOnInvalidProps = BaseProps

export function FormFieldOnInvalid(props: FormFieldOnInvalidProps) {
  const { ...passed } = props

  return <FormFieldOnInvalidBase {...passed}></FormFieldOnInvalidBase>
}

const FormFieldOnInvalidBase = styled(Base)`` as typeof Base
