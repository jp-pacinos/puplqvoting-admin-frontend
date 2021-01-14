import React from 'react'
import { useSelector } from 'react-redux'

import { selectPositionOptions } from 'features/app/appSlice'
import Select, { SelectProps } from 'common/components/Core/Select'

interface Props extends Omit<SelectProps, 'items'> {}

const SelectElection: React.FC<Props> = (props) => {
  const items = useSelector(selectPositionOptions)

  return <Select items={items} {...props} />
}

export default SelectElection
