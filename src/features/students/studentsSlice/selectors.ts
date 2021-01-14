import { RootState } from 'app/store'
import studentsAdapter from './studentsAdapter'

export const {
  selectById: selectStudentById,
  selectIds: selectStudentIds,
  selectTotal: selectStudentsTotal,
} = studentsAdapter.getSelectors((state: RootState) => state.students)

export const selectPagination = (state: RootState) => state.students.pagination

export const selectFetchStatus = (state: RootState) => state.students.status

export const selectCheckedCount = (state: RootState) => state.students.checkedCount

// modals
export const selectAddModal = (state: RootState) => state.students.addModal
//
export const selectEditModal = (state: RootState) => state.students.editModal
export const selectDeleteModal = (state: RootState) => state.students.deleteModal
//
export const selectGroupEditModal = (state: RootState) => state.students.groupEditModal
export const selectGroupDeleteModal = (state: RootState) => state.students.groupDeleteModal
