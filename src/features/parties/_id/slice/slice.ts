import { createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit'
import initialState from './initialState'

import {
  fetchParty,
  studentsSearch,
  makeOfficial,
  removeOfficial,
  updateOfficialPosition,
  newOfficialPicture,
  deleteOfficialPicture,
} from './actionAsync'
import { officialsAdapter, addOfficialsAdapter } from './adapters'
import { ErrorMessage, RequestStatus } from 'common/constants'
import { OfficialFields, StateProps } from './types'

const slice = createSlice({
  name: 'party',

  initialState: initialState,

  reducers: {
    setParty(state, action: PayloadAction<StateProps['party']>) {
      state.party.id = action.payload.id
      state.party.name = action.payload.name
      state.party.description = action.payload.description
      state.party.session_id = action.payload.session_id
      state.party.created_at = action.payload.created_at
      state.party.updated_at = action.payload.updated_at
    },

    officialPictureModalOpen(state, action: PayloadAction<{ officialId: EntityId }>) {
      state.modalAddPicture.open = true
      state.modalAddPicture.officialId = action.payload.officialId
    },

    officialPictureModalClose(state) {
      state.modalAddPicture.open = false
      state.modalAddPicture.officialId = null
    },
  },

  extraReducers: (builder) => {
    /**
     * fetch party
     */
    builder.addCase(fetchParty.pending, (state) => {
      state.status = RequestStatus.pending
      officialsAdapter.removeAll(state.officials)
    })

    builder.addCase(fetchParty.fulfilled, (state, { payload }) => {
      const { officials, ...party } = payload

      state.status = RequestStatus.success

      state.party.id = party.id
      state.party.name = party.name
      state.party.description = party.description
      state.party.session_id = party.session_id
      state.party.created_at = party.created_at
      state.party.updated_at = party.updated_at

      officialsAdapter.setAll(state.officials, officials)
    })

    builder.addCase(fetchParty.rejected, (state) => {
      state.status = RequestStatus.failure
    })

    /**
     * student search
     */
    builder.addCase(studentsSearch.pending, (state) => {
      state.search.status = RequestStatus.pending
    })

    builder.addCase(studentsSearch.fulfilled, (state, { payload }) => {
      let { students, pagination } = state.search

      state.search.status = RequestStatus.success

      pagination.to = payload.to
      pagination.from = payload.from
      pagination.total = payload.total

      addOfficialsAdapter.setAll(students, payload.data)
    })

    builder.addCase(studentsSearch.rejected, (state, action) => {
      if (action.error.name === ErrorMessage.axiosAbort) return // ignore axios cancel error
      state.search.status = RequestStatus.failure
    })

    /**
     * add official
     */
    builder.addCase(makeOfficial.pending, (state, action) => {
      // remove student from the list
      // update ~ change display to none
      addOfficialsAdapter.updateOne(state.search.students, {
        id: action.meta.arg.studentId,
        changes: { adding: true },
      })

      // add to the official tbl
      const student = state.search.students.entities[action.meta.arg.studentId]
      if (!student) return

      const tempOfficial: OfficialFields = {
        id: action.meta.arg.tempId as number,
        party_id: action.meta.arg.partyId,
        display_picture: null,
        created_at: '',
        updated_at: '',
        position_id: '' as any,
        student_id: action.meta.arg.studentId,
        student: student,
      }

      officialsAdapter.addOne(state.officials, tempOfficial)
    })

    builder.addCase(makeOfficial.fulfilled, (state, action) => {
      // update temporary fields
      officialsAdapter.updateOne(state.officials, {
        id: action.meta.arg.tempId,
        changes: action.payload.official,
      })
    })

    builder.addCase(makeOfficial.rejected, (state, action) => {
      officialsAdapter.removeOne(state.officials, action.meta.arg.tempId)

      addOfficialsAdapter.updateOne(state.search.students, {
        id: action.meta.arg.studentId,
        changes: {
          adding: false,
        },
      })
    })

    /**
     * remove official
     */
    builder.addCase(removeOfficial.pending, (state, action) => {
      officialsAdapter.updateOne(state.officials, {
        id: action.meta.arg.officialId,
        changes: {
          removing: true,
        },
      })
    })

    builder.addCase(removeOfficial.fulfilled, (state, action) => {
      officialsAdapter.removeOne(state.officials, action.meta.arg.officialId)
    })

    builder.addCase(removeOfficial.rejected, (state, action) => {
      officialsAdapter.updateOne(state.officials, {
        id: action.meta.arg.officialId,
        changes: {
          removing: false,
        },
      })
    })

    /**
     * update official's position
     */
    builder.addCase(updateOfficialPosition.pending, (state, action) => {
      officialsAdapter.updateOne(state.officials, {
        id: action.meta.arg.officialId,
        changes: {
          position_id: action.meta.arg.positionId,
        },
      })
    })

    /**
     * new official's picture
     */
    builder.addCase(newOfficialPicture.pending, (state) => {
      state.modalAddPicture.status = RequestStatus.pending
    })

    builder.addCase(newOfficialPicture.fulfilled, (state, action) => {
      officialsAdapter.updateOne(state.officials, {
        id: action.meta.arg.officialId,
        changes: {
          display_picture: action.payload.image_url,
        },
      })

      state.modalAddPicture.open = false
      state.modalAddPicture.officialId = null
      state.modalAddPicture.status = RequestStatus.success
    })

    builder.addCase(newOfficialPicture.rejected, (state) => {
      state.modalAddPicture.status = RequestStatus.failure
    })

    /**
     * delete official's picture
     */
    builder.addCase(deleteOfficialPicture.pending, (state, action) => {
      officialsAdapter.updateOne(state.officials, {
        id: action.meta.arg.officialId,
        changes: {
          display_picture: null,
        },
      })
    })
  },
})

export const reducer = slice.reducer

export const { setParty, officialPictureModalOpen, officialPictureModalClose } = slice.actions

export default slice
