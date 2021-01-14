import React from 'react'
import { useSelector } from 'react-redux'

import { selectSexOptions } from 'features/app/appSlice'
import Select, { SelectProps } from 'common/components/Core/Select'

interface Props extends Omit<SelectProps, 'items'> {}

const SelectGender: React.FC<Props> = (props) => {
  const items = useSelector(selectSexOptions)

  return <Select items={items} {...props} />
}

export default SelectGender
