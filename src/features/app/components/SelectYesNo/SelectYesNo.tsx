import React from 'react'
import { useSelector } from 'react-redux'

import { selectYesNoOptions } from 'features/app/appSlice'
import Select, { SelectProps } from 'common/components/Core/Select'

interface Props extends Omit<SelectProps, 'items'> {}

const SelectYesNo: React.FC<Props> = (props) => {
  const items = useSelector(selectYesNoOptions)

  return <Select items={items} {...props} />
}

export default SelectYesNo
