import { combineReducers } from '@reduxjs/toolkit'
import { reducer as electionReducer } from './_id/slice'
import { reducer as electionsReducer } from './index/slice'
import { reducer as electionsSettingsReducer } from './_id_settings/slice'
import { reducer as electionKeysReducer } from './_id_keys/slice'

const reducers = combineReducers({
  indexPage: electionsReducer,
  electionPage: electionReducer,
  electionSettingsPage: electionsSettingsReducer,
  electionKeysPage: electionKeysReducer,
})

export default reducers
