import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from 'app/store'
import { Duration } from 'common/constants'
import { snackbarOpen } from 'features/snackbar'

import { Student as StudentModel } from 'api/types/Models'
import {
  getStudents,
  getStudent,
  createStudent as apiCreateStudent,
  updateStudent as apiUpdateStudent,
  removeStudent,
  groupUpdate,
  groupRemove,
  ApiFunction,
  ApiResponse,
} from 'api/students'
import { StudentTableDataProps as Student } from './types'

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (params: ApiFunction.getStudentsParams, { signal }) => {
    const source = axios.CancelToken.source()

    signal.addEventListener('abort', () => {
      source.cancel()
    })

    const response = await getStudents({
      ...params,
      options: {
        ...params.options,
        cancelToken: source.token,
      },
    })

    return response.data
  }
)

export const fetchStudent = createAsyncThunk(
  'students/fetchStudent',
  async ({ studentId }: { studentId: Student['id'] }) => {
    const response = await getStudent(studentId)
    return response.data
  }
)

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (student: StudentModel.Fillable, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiCreateStudent(student)

      dispatch(
        snackbarOpen({
          text: `Student created ${student.student_number}.`,
          position: { x: 'left', y: 'bottom' },
          duration: Duration.short,
        })
      )

      return response.data
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data) // laravel validation
      }

      throw e
    }
  }
)

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async (
    {
      studentId,
      changes,
    }: { studentId: StudentModel.Fields['id']; changes: StudentModel.Fillable },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await apiUpdateStudent(studentId, changes)

      dispatch(
        snackbarOpen({
          text: `Student updated ${response.data.data.student_number}.`,
          position: { x: 'left', y: 'bottom' },
          duration: Duration.short,
        })
      )

      return response.data
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data) // laravel validation
      }

      throw e
    }
  }
)

export const deleteStudent = createAsyncThunk<
  ApiResponse.deleteStudent,
  { studentId: StudentModel.Fields['id'] },
  { state: RootState }
>('students/deleteStudent', async ({ studentId }, { getState, dispatch }) => {
  const student = getState().students.entities[studentId]

  dispatch(
    snackbarOpen({
      text: `Student ${student?.student_number} removed.`,
      duration: Duration.short,
    })
  )

  const response = await removeStudent(studentId)
  return response.data
})

export const groupUpdateStudents = createAsyncThunk(
  'students/groupUpdateStudents',
  async (data: ApiFunction.groupStudentsUpdateParams, { dispatch }) => {
    const response = await groupUpdate(data)
    const count = response.data.updatedCount

    dispatch(
      snackbarOpen({
        text: count > 1 ? `${count} Student Accounts updated.` : 'Student Account updated.',
        position: { x: 'left', y: 'bottom' },
        duration: Duration.short,
      })
    )

    return response.data
  }
)

export const groupDeleteStudents = createAsyncThunk(
  'students/groupDeleteStudents',
  async ({ studentIds }: { studentIds: number[] }, { dispatch }) => {
    const count = studentIds.length

    dispatch(
      snackbarOpen({
        text: count > 1 ? `${count} Student Accounts updated.` : 'Student Account updated.',
        position: { x: 'left', y: 'bottom' },
        duration: Duration.short,
      })
    )

    const response = await groupRemove(studentIds)
    return response.data
  }
)
