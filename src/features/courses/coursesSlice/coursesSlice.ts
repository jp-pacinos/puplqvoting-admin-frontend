import { createSlice, PayloadAction, EntityState, EntityId } from '@reduxjs/toolkit'

import { RequestStatus } from 'api/types'
import { ApiValidationResponse } from 'api/courses'
import { RootState } from 'app/store'
import { coursesAdapter, CoursesTable } from './adapters'
import { fetchCourses, addCourse, updateCourseAsync, deleteCourse } from './actionsAsync'

interface StateProps extends EntityState<CoursesTable> {
  status: RequestStatus
  addModal: {
    open: boolean
    status: RequestStatus | 'validating'
    validation: ApiValidationResponse.addCourse
  }
  deleteModal: {
    open: boolean
    courseId: EntityId
  }
}

const initialState: StateProps = {
  ids: [],
  entities: {},
  status: 'idle',

  addModal: {
    open: false,
    status: 'idle',
    validation: {
      message: '',
      errors: {},
    },
  },

  deleteModal: {
    open: false,
    courseId: 0,
  },
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState,

  reducers: {
    addModalOpen(state) {
      state.addModal = {
        ...initialState.addModal,
        open: true,
      }
    },

    addModalClose(state) {
      state.addModal = {
        ...initialState.addModal,
        open: false,
      }
    },

    deleteModalOpen(state, action: PayloadAction<{ id: EntityId }>) {
      state.deleteModal.open = true
      state.deleteModal.courseId = action.payload.id
    },

    deleteModalClose(state) {
      state.deleteModal = initialState.deleteModal
    },

    allowEditCourse(state, action: PayloadAction<{ id: EntityId }>) {
      coursesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          editing: true,
          updating: false,
          deleteing: false,
          validating: false,
        },
      })
    },

    endEditCourse(state, action: PayloadAction<{ id: EntityId }>) {
      coursesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          editing: false,
          updating: false,
          deleteing: false,
          validating: false,
        },
      })
    },
  },

  extraReducers: (builder) => {
    /**
     * fetch courses
     */

    builder.addCase(fetchCourses.pending, (state) => {
      state.status = 'pending'
    })

    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      coursesAdapter.setAll(state, action.payload)
      state.status = 'success'
    })

    builder.addCase(fetchCourses.rejected, (state, action) => {
      if (action.meta.aborted) return
      state.status = 'failure'
    })

    /**
     * add course
     */

    builder.addCase(addCourse.pending, (state) => {
      state.addModal.validation = initialState.addModal.validation
      state.addModal.status = 'pending'
    })

    builder.addCase(addCourse.fulfilled, (state, action) => {
      coursesAdapter.addOne(state, action.payload.course)
      state.addModal.status = 'success'
      state.addModal.open = false
    })

    builder.addCase(addCourse.rejected, (state, action) => {
      let hasValidation = action.payload as ApiValidationResponse.addCourse | undefined

      // axios error.response.data
      if (hasValidation) {
        state.addModal.validation = hasValidation
        state.addModal.status = 'validating'
        return
      }
      state.addModal.status = 'failure'
    })

    /**
     * update course
     */

    builder.addCase(updateCourseAsync.pending, (state, action) => {
      coursesAdapter.updateOne(state, {
        id: action.meta.arg.id,
        changes: {
          editing: false,
          updating: true,
        },
      })
    })

    builder.addCase(updateCourseAsync.fulfilled, (state, action) => {
      coursesAdapter.updateOne(state, {
        id: action.meta.arg.id,
        changes: {
          editing: false,
          updating: false,
          validating: false,
          ...action.payload.course,
        },
      })
    })

    builder.addCase(updateCourseAsync.rejected, (state, action) => {
      // axios error.response.data
      if (!action.payload) return

      coursesAdapter.updateOne(state, {
        id: action.meta.arg.id,
        changes: {
          editing: true,
          updating: false,
          validating: true,
        },
      })
    })

    /**
     * delete course
     */

    builder.addCase(deleteCourse.pending, (state, action) => {
      coursesAdapter.updateOne(state, {
        id: action.meta.arg.id,
        changes: {
          deleteing: true,
        },
      })
    })

    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      coursesAdapter.removeOne(state, action.meta.arg.id)
      state.deleteModal.courseId = initialState.deleteModal.courseId
    })

    builder.addCase(deleteCourse.rejected, (state, action) => {
      coursesAdapter.updateOne(state, {
        id: action.meta.arg.id,
        changes: {
          deleteing: false,
        },
      })
    })
  },
})

export default coursesSlice

export const reducer = coursesSlice.reducer

export const {
  addModalOpen,
  addModalClose,
  deleteModalOpen,
  deleteModalClose,
  allowEditCourse,
  endEditCourse,
} = coursesSlice.actions

export const {
  selectIds: selectCourseIds,
  selectById: selectCourseById,
} = coursesAdapter.getSelectors((state: RootState) => state.courses)

export const selectFetchStatus = (state: RootState) => state.courses.status

export const selectAddModal = (state: RootState) => state.courses.addModal

export const selectDeleteModal = (state: RootState) => state.courses.deleteModal
