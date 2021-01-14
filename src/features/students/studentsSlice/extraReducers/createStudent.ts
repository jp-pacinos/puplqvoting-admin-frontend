import { ExtraReducer } from './types'
import { ApiValidationResponse } from 'api/students'
import { createStudent } from 'features/students/studentsSlice/actionsAsync'
import { RequestStatus } from 'common/constants'
import { studentsAdapter } from 'features/students/studentsSlice'
import initialState from 'features/students/studentsSlice/initialState'

const Reducer: ExtraReducer = (builder) => {
  builder.addCase(createStudent.pending, (state) => {
    state.addModal.validation = initialState.addModal.validation
    state.addModal.status = RequestStatus.pending
  })

  builder.addCase(createStudent.fulfilled, (state, action) => {
    studentsAdapter.addOne(state, {
      ...action.payload.data,
      official_id: null,
    })

    state.pagination.to++
    state.pagination.total++

    state.addModal.open = false
    state.addModal.status = RequestStatus.success
  })

  builder.addCase(createStudent.rejected, (state, action) => {
    let hasValidation = action.payload as ApiValidationResponse.addStudent | undefined

    // axios error.response.data
    if (hasValidation) {
      state.addModal.validation = hasValidation
      state.addModal.status = RequestStatus.validating
      return
    }

    state.addModal.status = RequestStatus.failure
  })
}

export default Reducer
