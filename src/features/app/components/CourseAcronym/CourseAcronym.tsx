import React from 'react'
import { EntityId } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { RootState } from 'app/store'
import { selectCourseById } from 'features/app/appSlice'

interface Props {
  id: EntityId
}

const CourseAcronym: React.FC<Props> = ({ id: courseId }) => {
  const course = useSelector((state: RootState) => selectCourseById(state, courseId))

  return <>{course ? course.acronym : '-'}</>
}

export default CourseAcronym
