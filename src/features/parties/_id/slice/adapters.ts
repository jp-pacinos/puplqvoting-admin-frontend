import { createEntityAdapter } from '@reduxjs/toolkit'
import { OfficialFields, OfficialAddFields } from './types'

export const officialsAdapter = createEntityAdapter<OfficialFields>({
  selectId: (official) => official.id,
})

export const addOfficialsAdapter = createEntityAdapter<OfficialAddFields>({
  selectId: (student) => student.id,
})
