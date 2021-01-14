import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateProps, StudentTableDataProps as Student } from './types'

import initialState from './initialState'
import extraReducers from './extraReducers'
import studentsAdapter from './studentsAdapter'

const studentsSlice = createSlice({
  name: 'students',

  initialState: studentsAdapter.getInitialState(initialState),

  reducers: {
    studentChecked(state, action: PayloadAction<{ id: Student['id']; checked: boolean }>) {
      let { id, checked } = action.payload
      let student = state.entities[id]

      if (!student) return

      student.checked = checked

      let type: keyof StateProps['checkedCount'] = student.official_id ? 'officers' : 'students'
      state.checkedCount[type] += checked ? 1 : -1
    },

    studentsAllChecked(state, action: PayloadAction<boolean>) {
      let checked = action.payload

      Object.values(state.entities).forEach((student) => {
        if (!student) return

        student.checked = checked

        if (checked) {
          let type: keyof StateProps['checkedCount'] = student.official_id ? 'officers' : 'students'
          state.checkedCount[type] += 1
        }
      })

      if (!checked) {
        state.checkedCount.students = 0
        state.checkedCount.officers = 0
      }
    },

    addModalOpen(state) {
      state.addModal.open = true
    },

    addModalClose(state) {
      state.addModal.open = false
    },

    editModalOpen(state, action: PayloadAction<Student['id']>) {
      state.editModal.open = true
      state.editModal.studentId = action.payload
    },

    editModalClose(state) {
      state.editModal.open = false
      state.editModal.studentId = 0
    },

    deleteModalOpen(state, action: PayloadAction<Student['id']>) {
      state.deleteModal.open = true
      state.deleteModal.studentId = action.payload
    },

    deleteModalClose(state) {
      state.deleteModal.open = false
      state.deleteModal.studentId = 0
    },

    groupEditModalOpen(state, action: PayloadAction<Student['id'][]>) {
      state.groupEditModal.open = true
      state.groupEditModal.studentIds = action.payload
    },

    groupEditModalClose(state) {
      state.groupEditModal.open = false
      state.groupEditModal.studentIds = []
    },

    groupDeleteModalOpen(state, action: PayloadAction<Student['id'][]>) {
      state.groupDeleteModal.open = true
      state.groupDeleteModal.studentIds = action.payload
    },

    groupDeleteModalClose(state) {
      state.groupDeleteModal.open = false
      state.groupDeleteModal.studentIds = []
    },
  },

  extraReducers,
})

export default studentsSlice
