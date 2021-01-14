import { AllowedFillable } from './types'

const initialState: AllowedFillable = {
  name: `Election ${new Date().getFullYear()}`,
  description: '',
  year: new Date().getFullYear(),
  registration: '' as any,
  verification_type: '' as any,
}

export default initialState
