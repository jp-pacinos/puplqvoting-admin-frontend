import React from 'react'
import { useSelector } from 'react-redux'

import { selectVerificationTypeOptions } from 'features/app/appSlice'
import Select, { SelectProps } from 'common/components/Core/Select'

interface Props extends Omit<SelectProps, 'items'> {}

const SelectVerificationType: React.FC<Props> = (props) => {
  const items = useSelector(selectVerificationTypeOptions)

  return <Select items={items} {...props} />
}

export default SelectVerificationType
