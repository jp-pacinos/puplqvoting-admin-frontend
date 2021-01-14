import { ExtraReducer } from './types'
import { studentsAdapter } from 'features/students/studentsSlice'
import { groupDeleteStudents } from 'features/students/studentsSlice/actionsAsync'

const Reducer: ExtraReducer = (builder) => {
  builder.addCase(groupDeleteStudents.pending, (state, action) => {
    let studentIds = action.meta.arg.studentIds

    // add deleting style
    studentsAdapter.updateMany(
      state,
      studentIds.map((id) => ({
        id,
        changes: { deleting: true },
      }))
    )

    // close the modal
    state.deleteModal.open = false

    // assume the students are deleted
    state.checkedCount.students = 0
  })

  builder.addCase(groupDeleteStudents.fulfilled, (state, action) => {
    let studentIds = action.meta.arg.studentIds
    let studentsCount = action.payload.deletedCount

    studentsAdapter.removeMany(state, studentIds)

    // update pagination
    state.pagination.to -= studentsCount
    state.pagination.total -= studentsCount
  })

  builder.addCase(groupDeleteStudents.rejected, (state, action) => {
    let studentIds = action.meta.arg.studentIds

    // remove deleting style and make checked again
    studentsAdapter.updateMany(
      state,
      studentIds.map((id) => ({
        id,
        changes: { deleting: false, checked: true },
      }))
    )

    state.checkedCount.students = studentIds.length
  })
}

export default Reducer
