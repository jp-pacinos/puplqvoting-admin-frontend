import React from 'react'
import { useSelector } from 'react-redux'

import { selectSessionOptions } from 'features/app/appSlice'
import Select, { SelectProps } from 'common/components/Core/Select'

interface Props extends Omit<SelectProps, 'items'> {}

const SelectElection: React.FC<Props> = (props) => {
  const items = useSelector(selectSessionOptions)

  return <Select items={items} {...props} />
}

export default SelectElection
