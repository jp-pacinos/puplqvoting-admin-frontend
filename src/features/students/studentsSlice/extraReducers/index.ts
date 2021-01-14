import { Builder } from './types'

import fetchStudents from './fetchStudents'
import fetchStudent from './fetchStudent'
import createStudent from './createStudent'
import updateStudent from './updateStudent'
import deleteStudent from './deleteStudent'
import groupUpdateStudents from './groupUpdateStudents'
import groupDeleteStudents from './groupDeleteStudents'

const extraReducers = (builder: Builder) => {
  /**
   * fetchStudents
   */
  fetchStudents(builder)

  /**
   * fetchStudent
   */
  fetchStudent(builder)

  /**
   * createStudent
   */
  createStudent(builder)

  /**
   * updateStudent
   */
  updateStudent(builder)

  /**
   * deleteStudent
   */
  deleteStudent(builder)

  /**
   * groups - update students
   */
  groupUpdateStudents(builder)

  /**
   * groups - delete students
   */
  groupDeleteStudents(builder)
}

export default extraReducers
