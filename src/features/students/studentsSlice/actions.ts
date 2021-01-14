import studentsSlice from './studentsSlice'

// actions
export const {
  // table
  studentChecked,
  studentsAllChecked,

  // modals
  addModalOpen,
  addModalClose,
  editModalOpen,
  editModalClose,
  deleteModalOpen,
  deleteModalClose,
  // modals - group
  groupEditModalOpen,
  groupEditModalClose,
  groupDeleteModalOpen,
  groupDeleteModalClose,

  //
} = studentsSlice.actions
