import { createEntityAdapter } from '@reduxjs/toolkit'
import { Party } from 'api/types/Models'

export const partiesAdapter = createEntityAdapter<Party.Fields>({
  selectId: (parties) => parties.id,
})
