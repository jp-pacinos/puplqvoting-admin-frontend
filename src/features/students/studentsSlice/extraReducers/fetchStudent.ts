import { ExtraReducer } from './types'
import { studentsAdapter } from 'features/students/studentsSlice'
import { fetchStudent } from 'features/students/studentsSlice/actionsAsync'
import { RequestStatus } from 'common/constants'

const Reducer: ExtraReducer = (builder) => {
  builder.addCase(fetchStudent.pending, (state) => {
    state.editModal.status = RequestStatus.pending
  })

  builder.addCase(fetchStudent.fulfilled, (state, action) => {
    studentsAdapter.updateOne(state, {
      id: action.meta.arg.studentId,
      changes: { ...action.payload },
    })

    state.editModal.status = RequestStatus.success
  })

  builder.addCase(fetchStudent.rejected, (state) => {
    state.editModal.status = RequestStatus.failure
  })
}

export default Reducer
