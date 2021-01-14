import { ExtraReducer } from './types'
import { studentsAdapter } from 'features/students/studentsSlice'
import { groupUpdateStudents } from 'features/students/studentsSlice/actionsAsync'
import { RequestStatus } from 'common/constants'

const Reducer: ExtraReducer = (builder) => {
  builder.addCase(groupUpdateStudents.pending, (state) => {
    state.groupEditModal.status = RequestStatus.pending
  })

  builder.addCase(groupUpdateStudents.fulfilled, (state, { meta }) => {
    studentsAdapter.updateMany(
      state,
      meta.arg.studentIds.map((id) => ({
        id,
        changes: {
          ...(meta.arg.can_vote ? { can_vote: meta.arg.can_vote } : {}),
          ...(meta.arg.course_id ? { course_id: meta.arg.course_id } : {}),
          ...(meta.arg.sex ? { sex: meta.arg.sex } : {}),
          checked: false,
        },
      }))
    )

    // we set the checkedCount props to zero so that the group modal closes
    state.checkedCount.students = 0
    state.checkedCount.officers = 0

    // close modal
    state.groupEditModal.open = false
    state.groupEditModal.status = RequestStatus.success
  })

  builder.addCase(groupUpdateStudents.rejected, (state, action) => {
    state.groupEditModal.status = RequestStatus.failure
  })
}

export default Reducer
