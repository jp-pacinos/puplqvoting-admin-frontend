import { createEntityAdapter } from '@reduxjs/toolkit'
import { StudentKeys } from './initialState'

export const studentKeysAdapter = createEntityAdapter<StudentKeys>({
  selectId: (studentKey) => studentKey.id,
})
