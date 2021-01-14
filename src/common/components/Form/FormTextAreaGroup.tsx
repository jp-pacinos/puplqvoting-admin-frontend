import React, { useMemo } from 'react'

import TextArea from 'common/components/Core/TextArea'
import FormGroup from './FormGroup'

interface Props extends React.ComponentPropsWithoutRef<'textarea'> {
  label: string
}

const FormTextAreaGroup: React.FC<Props> = ({ label, id, required, ...rest }) => {
  const input = useMemo(() => <TextArea id={id} required={required} {...rest} />, [
    id,
    required,
    rest,
  ])

  return <FormGroup id={id} label={label} inputRender={input} required={required} />
}

export default FormTextAreaGroup
