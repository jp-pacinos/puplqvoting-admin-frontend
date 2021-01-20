import { createSlice, PayloadAction, EntityId } from '@reduxjs/toolkit'
import { RequestStatus } from 'common/constants'
import { fetchStudentKeys, groupGenerateKeys, groupDeleteKeys } from './actionsAsync'
import { studentKeysAdapter } from './adapters'
import initialState from './initialState'

const electionKeysSlice = createSlice({
  name: 'electionKeys',
  initialState,
  reducers: {
    setElectionId(state, action: PayloadAction<number>) {
      state.electionId = action.payload
    },

    studentKeyCheckboxToggle(state, action: PayloadAction<{ id: EntityId; checked: boolean }>) {
      studentKeysAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          checked: action.payload.checked,
        },
      })
    },

    incrementCheckedCount(state, action: PayloadAction<{ haveCode?: boolean } | undefined>) {
      state.checkedCount.all++
      if (action.payload && action.payload.haveCode) state.checkedCount.withCode++
    },

    decrementCheckedCount(state, action: PayloadAction<{ haveCode?: boolean } | undefined>) {
      state.checkedCount.all--
      if (action.payload && action.payload.haveCode) state.checkedCount.withCode--
    },

    checkboxToggleAll(state, action: PayloadAction<boolean>) {
      let checked = action.payload

      Object.values(state.entities).forEach((student) => {
        if (!student) return
        student.checked = checked

        state.checkedCount.all++
        if (student.confirmation_code) {
          state.checkedCount.withCode++
        }
      })

      if (!checked) {
        state.checkedCount = initialState.checkedCount
      }
    },

    setStudentCode(state, action: PayloadAction<{ keyId: EntityId; code: string }>) {
      studentKeysAdapter.updateOne(state, {
        id: action.payload.keyId,
        changes: {
          confirmation_code: action.payload.code,
        },
      })
    },

    groupDeleteModalOpen(state) {
      state.groupDeleteModal.open = true
    },

    groupDeleteModalClose(state) {
      state.groupDeleteModal.open = false
    },
  },

  extraReducers: (builder) => {
    /**
     * fetchStudentKeys
     */

    builder.addCase(fetchStudentKeys.pending, (state) => {
      state.checkedCount = initialState.checkedCount
      state.status = RequestStatus.pending
    })

    builder.addCase(fetchStudentKeys.fulfilled, (state, action) => {
      state.status = RequestStatus.success
      studentKeysAdapter.setAll(state, action.payload.data)

      state.pagination.current_page = action.payload.current_page
      state.pagination.per_page = action.payload.per_page
      state.pagination.from = action.payload.from
      state.pagination.to = action.payload.to
      state.pagination.total = action.payload.total
    })

    builder.addCase(fetchStudentKeys.rejected, (state, action) => {
      if (action.meta.aborted) return
      state.status = RequestStatus.failure
    })

    /**
     * groupGenerateKeys
     */

    builder.addCase(groupGenerateKeys.fulfilled, (state, action) => {
      studentKeysAdapter.updateMany(
        state,
        action.payload.data.map((key) => {
          return {
            id: key.student_id,
            changes: {
              checked: false,
              confirmation_code: key.confirmation_code,
            },
          }
        })
      )

      state.checkedCount.all = state.checkedCount.withCode
    })

    /**
     * groupDeleteKeys
     */

    builder.addCase(groupDeleteKeys.pending, (state, action) => {
      let ids = action.meta.arg.studentIds

      studentKeysAdapter.updateMany(
        state,
        ids.map((id) => ({
          id,
          changes: { deleting: true, checked: false },
        }))
      )

      state.checkedCount.all -= ids.length
      state.checkedCount.withCode -= ids.length
    })
    builder.addCase(groupDeleteKeys.fulfilled, (state, action) => {
      let ids = action.meta.arg.studentIds

      studentKeysAdapter.updateMany(
        state,
        ids.map((id) => ({
          id,
          changes: {
            deleting: false,
            confirmation_code: null,
          },
        }))
      )
    })
    builder.addCase(groupDeleteKeys.rejected, (state, action) => {
      let ids = action.meta.arg.studentIds

      studentKeysAdapter.updateMany(
        state,
        ids.map((id) => ({
          id,
          changes: { deleting: false, checked: true },
        }))
      )

      state.checkedCount.all += ids.length
      state.checkedCount.withCode += ids.length
    })
  },
})

export default electionKeysSlice

export const reducer = electionKeysSlice.reducer

export const {
  setElectionId,
  studentKeyCheckboxToggle,
  incrementCheckedCount,
  decrementCheckedCount,
  checkboxToggleAll,
  setStudentCode,
  groupDeleteModalOpen,
  groupDeleteModalClose,
} = electionKeysSlice.actions
