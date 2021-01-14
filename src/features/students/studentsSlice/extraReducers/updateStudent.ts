import { ExtraReducer } from './types'
import { ApiValidationResponse } from 'api/students'
import { studentsAdapter } from 'features/students/studentsSlice'
import { updateStudent } from 'features/students/studentsSlice/actionsAsync'
import { RequestStatus } from 'common/constants'
import initialState from 'features/students/studentsSlice/initialState'

const Reducer: ExtraReducer = (builder) => {
  builder.addCase(updateStudent.pending, (state) => {
    state.editModal.validation = initialState.editModal.validation
    state.editModal.status = RequestStatus.pending
  })

  builder.addCase(updateStudent.fulfilled, (state, action) => {
    studentsAdapter.updateOne(state, {
      id: action.meta.arg.studentId,
      changes: { ...action.payload.data },
    })

    state.editModal.open = false
    state.editModal.status = RequestStatus.success
  })

  builder.addCase(updateStudent.rejected, (state, action) => {
    let hasValidation = action.payload as ApiValidationResponse.updateStudent | undefined

    // axios error.response.data
    if (hasValidation) {
      state.editModal.validation = hasValidation
      state.editModal.status = RequestStatus.validating
      return
    }

    state.editModal.status = RequestStatus.failure
  })
}

export default Reducer
