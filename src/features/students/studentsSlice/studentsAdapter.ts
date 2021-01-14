import { createEntityAdapter } from '@reduxjs/toolkit'
import { StudentTableDataProps as Student } from './types'

const studentsAdapter = createEntityAdapter<Student>({
  selectId: (student) => student.id,
})

export default studentsAdapter
