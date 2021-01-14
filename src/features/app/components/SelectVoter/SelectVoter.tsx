import React from 'react'
import { useSelector } from 'react-redux'

import { selectVoterOptions } from 'features/app/appSlice'
import Select, { SelectProps } from 'common/components/Core/Select'

interface Props extends Omit<SelectProps, 'items'> {}

const SelectVoter: React.FC<Props> = (props) => {
  const items = useSelector(selectVoterOptions)

  return <Select items={items} {...props} />
}

export default SelectVoter
