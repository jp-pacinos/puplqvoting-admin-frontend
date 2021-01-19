import { createEntityAdapter } from '@reduxjs/toolkit'
import { ApiResponse } from 'api/elections/types'

type StudentKeysTable = ApiResponse.StudentKeys & { checked?: boolean; deleting?: boolean }

export const studentKeysAdapter = createEntityAdapter<StudentKeysTable>({
  selectId: (studentKey) => studentKey.id,
})
