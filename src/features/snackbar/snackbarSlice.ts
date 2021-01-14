import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PositionProps } from 'common/components/Core/FloatBox'
import { Duration } from 'common/constants'

interface Snackbar {
  text: string
  open: boolean
  duration?: number
  position?: PositionProps
}

const initialState: Snackbar = {
  text: '',
  open: false,
  duration: Duration.short,
  position: { x: 'left', y: 'bottom' },
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    snackbarOpen(state, action: PayloadAction<Omit<Snackbar, 'open'>>) {
      const {
        text = '',
        duration = initialState.duration,
        position = initialState.position,
      } = action.payload

      state.text = text
      state.position = position
      state.duration = duration
      state.open = true
    },

    snackbarClose(state) {
      state.open = false
    },
  },
})

export default snackbarSlice

export const reducer = snackbarSlice.reducer

export const { snackbarOpen, snackbarClose } = snackbarSlice.actions
