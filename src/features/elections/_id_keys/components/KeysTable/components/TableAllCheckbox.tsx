import React from 'react'
import { Checkbox } from 'common/components/Core'

interface CheckAllProps {}

const TableAllCheckbox: React.FC<CheckAllProps> = () => {
  return <Checkbox className="block m-auto text-blue-500" />
}

export default TableAllCheckbox
