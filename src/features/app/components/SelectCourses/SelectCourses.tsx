import React from 'react'
import { useSelector } from 'react-redux'

import { Select } from 'common/components/Core'
import { selectSelectCourses } from 'features/app/appSlice'

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}

const SelectCourses: React.FC<Props> = (props) => {
  const courseItems = useSelector(selectSelectCourses)

  return <Select items={courseItems} {...props} />
}

export default SelectCourses
