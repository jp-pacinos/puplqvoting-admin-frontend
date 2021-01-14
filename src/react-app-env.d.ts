/// <reference types="react-scripts" />

import { RootState } from 'app/store'

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}
