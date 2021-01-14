import { ExtraReducer } from './types'
import { studentsAdapter } from 'features/students/studentsSlice'
import { fetchStudents } from 'features/students/studentsSlice/actionsAsync'
import { RequestStatus, ErrorMessage } from 'common/constants'

const Reducer: ExtraReducer = (builder) => {
  builder.addCase(fetchStudents.pending, (state) => {
    state.checkedCount = { students: 0, officers: 0 } // hides MassActionButtons component
    state.status = RequestStatus.pending
  })

  builder.addCase(fetchStudents.fulfilled, (state, action) => {
    state.pagination.current_page = action.payload.current_page
    state.pagination.per_page = action.payload.per_page
    state.pagination.from = action.payload.from
    state.pagination.to = action.payload.to
    state.pagination.total = action.payload.total

    studentsAdapter.setAll(state, action.payload.data)

    state.status = RequestStatus.success
  })

  builder.addCase(fetchStudents.rejected, (state, action) => {
    if (action.error.name === ErrorMessage.axiosAbort) return // ignore axios cancel error

    state.status = RequestStatus.failure
  })
}

export default Reducer
