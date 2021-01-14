import { createEntityAdapter } from '@reduxjs/toolkit'

import { ApiResponse } from 'api/elections'

export const officialsAdapter = createEntityAdapter<ApiResponse.DetailedOfficial>({
  selectId: (official) => official.id,
})
