import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { snackbarOpen, snackbarClose } from 'features/snackbar'
import {
  ApiFunction,
  getCourses,
  addCourse as addCourseApi,
  updateCourse as updateCourseApi,
  deleteCourse as deleteCourseApi,
} from 'api/courses'

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params: ApiFunction.getCoursesParams, { signal }) => {
    const source = axios.CancelToken.source()

    signal.addEventListener('abort', () => {
      source.cancel()
    })

    let response = await getCourses({
      ...params,
      config: {
        ...params.config,
        cancelToken: source.token,
      },
    })
    return response.data
  }
)

export const addCourse = createAsyncThunk(
  'courses/updateCourse',
  async (params: ApiFunction.addCourseParams, { dispatch, rejectWithValue }) => {
    try {
      const response = await addCourseApi(params)

      dispatch(
        snackbarOpen({
          text: `Course ${response.data.course.name} added.`,
          position: { x: 'left', y: 'bottom' },
          duration: 5000,
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

export const updateCourseAsync = createAsyncThunk(
  'courses/updateCourseAsync',
  async (params: ApiFunction.updateCourseParams, { rejectWithValue, dispatch }) => {
    try {
      let response = await updateCourseApi(params)
      return response.data
    } catch (e) {
      if (e.response) {
        // @ts-ignore-start
        let firstMessage: any = Object.entries(e.response.data.errors)[0][1][0]
        // @ts-ignore-end

        dispatch(
          snackbarOpen({
            text: firstMessage ? firstMessage : e.response.data.message,
            position: { x: 'left', y: 'bottom' },
            duration: 5000,
          })
        )

        return rejectWithValue(e.response.data) // laravel validation
      }

      throw e
    }
  }
)

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (params: ApiFunction.deleteCourseParams, { dispatch }) => {
    dispatch(
      snackbarOpen({
        text: `Please wait...`,
        position: { x: 'left', y: 'bottom' },
        duration: 5000,
      })
    )

    let response = await deleteCourseApi(params)

    dispatch(
      snackbarOpen({
        text: `Course deleted.`,
        position: { x: 'left', y: 'bottom' },
        duration: 3000,
      })
    )

    return response.data
  }
)
