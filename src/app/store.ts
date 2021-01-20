import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

// reducers
import { reducer as appReducer } from 'features/app/appSlice'
import { reducer as electionsReducer } from 'features/elections'
import { reducer as partiesReducer } from 'features/parties/partiesSlice'
import { reducer as studentsReducer } from 'features/students/studentsSlice'
import { reducer as coursesReducer } from 'features/courses/coursesSlice'
import { reducer as snackbarReducer } from 'features/snackbar/snackbarSlice'

const store = configureStore({
  reducer: {
    // initial state
    app: appReducer,

    // pages
    election: electionsReducer,
    parties: partiesReducer,
    students: studentsReducer,
    courses: coursesReducer,

    //
    snackbar: snackbarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export type AppDispatch = typeof store.dispatch

export default store
