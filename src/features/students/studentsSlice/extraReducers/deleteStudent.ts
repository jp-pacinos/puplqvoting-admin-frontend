import { ExtraReducer } from './types'
import { studentsAdapter } from 'features/students/studentsSlice'
import { deleteStudent } from 'features/students/studentsSlice/actionsAsync'

const Reducer: ExtraReducer = (builder) => {
  builder.addCase(deleteStudent.pending, (state, action) => {
    // create deleting style for that row
    studentsAdapter.updateOne(state, {
      id: action.meta.arg.studentId,
      changes: { deleting: true },
    })
  })

  builder.addCase(deleteStudent.fulfilled, (state, action) => {
    let student = state.entities[action.meta.arg.studentId]

    if (!student) return

    // remove
    studentsAdapter.removeOne(state, action.meta.arg.studentId)

    // update pagination
    state.pagination.to--
    state.pagination.total--

    // checked count student only
    if (state.checkedCount.students !== 0) state.checkedCount.students -= 1
  })

  builder.addCase(deleteStudent.rejected, (state, action) => {
    // remove deleting style
    studentsAdapter.updateOne(state, {
      id: action.meta.arg.studentId,
      changes: { deleting: false },
    })
  })
}

export default Reducer
