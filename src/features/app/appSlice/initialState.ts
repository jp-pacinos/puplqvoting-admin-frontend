import { sessionAdaper, coursesAdapter, positionsAdapter } from './adapters'
import { StateProps } from './types'

const initialState: StateProps = {
  sex: [
    {
      text: 'Male',
      value: 'MALE',
    },
    {
      text: 'Female',
      value: 'FEMALE',
    },
  ],
  voter: [
    {
      text: 'Allowed',
      value: '1',
    },
    {
      text: 'Denied',
      value: '0',
    },
  ],
  verificationType: [
    {
      value: 'code',
      text: 'Code',
    },
    {
      value: 'email',
      text: 'Email',
    },
    {
      value: 'open',
      text: 'Open (no validation)',
    },
  ],
  yesNo: [
    {
      value: '1',
      text: 'Yes',
    },
    {
      value: '0',
      text: 'No',
    },
  ],
  sessions: sessionAdaper.getInitialState(),
  positions: positionsAdapter.getInitialState(),
  courses: coursesAdapter.getInitialState(),
}

export default initialState
