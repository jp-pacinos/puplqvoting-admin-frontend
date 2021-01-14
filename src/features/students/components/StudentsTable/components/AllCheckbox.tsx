import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Checkbox from 'common/components/Core/Checkbox'

import { selectCheckedCount, studentsAllChecked } from 'features/students/studentsSlice'

interface Props {}

const AllCheckbox: React.FC<Props> = () => {
  const { students, officers } = useSelector(selectCheckedCount)
  const dispatch = useDispatch()

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(studentsAllChecked(e.target.checked))
  }

  let totalChecked = students + officers

  return (
    <Checkbox
      className="block m-auto text-blue-500"
      checked={totalChecked > 0}
      onChange={handleCheckAll}
    />
  )
}

export default AllCheckbox
