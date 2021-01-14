import React, { useMemo, forwardRef } from 'react'

import Input from 'common/components/Core/Input'
import FormGroup from './FormGroup'

interface Props extends React.ComponentPropsWithRef<'input'> {
  label: string
}

const FormInputGroup: React.FC<Props> = forwardRef(
  ({ label, type = 'text', id, required, ...rest }, ref) => {
    const input = useMemo(
      () => <Input ref={ref} type={type} id={id} required={required} {...rest} />,
      [id, ref, required, rest, type]
    )

    return <FormGroup id={id} label={label} inputRender={input} required={required} />
  }
)

export default React.memo(FormInputGroup)
