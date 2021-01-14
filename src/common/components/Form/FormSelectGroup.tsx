import React, { useMemo } from 'react'

import { Item } from 'common/components/Core/Select/types'
import Select from 'common/components/Core/Select'

import FormGroup from './FormGroup'

interface Props extends React.ComponentPropsWithoutRef<'select'> {
  label: string
  items: Item[]
}

const FormSelectGroup: React.FC<Props> = ({ label, id, required, items, ...rest }) => {
  const input = useMemo(
    () => <Select items={items} className="py-2" required={required} {...rest} />,
    [items, required, rest]
  )

  return <FormGroup id={id} label={label} inputRender={input} required={required} />
}

export default React.memo(FormSelectGroup)
