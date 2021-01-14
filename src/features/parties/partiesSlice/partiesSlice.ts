import { combineReducers } from '@reduxjs/toolkit'
import { reducer as indexPageReducer } from 'features/parties/index/slice'
import { reducer as partyPageReducer } from 'features/parties/_id/slice'

const reducers = combineReducers({
  indexPage: indexPageReducer,
  partyPage: partyPageReducer,
})

export default reducers
