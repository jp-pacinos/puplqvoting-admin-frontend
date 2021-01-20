import { createEntityAdapter } from '@reduxjs/toolkit'
import { Course } from 'api/types/Models'

export type CoursesTable = Course.Fields & {
  updating?: boolean
  deleteing?: boolean
  editing?: boolean
  validating?: boolean
}

export const coursesAdapter = createEntityAdapter<CoursesTable>({
  selectId: (course) => course.id,
})
