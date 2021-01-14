import { ActionReducerMapBuilder, EntityState } from '@reduxjs/toolkit'
import { StateProps, StudentTableDataProps } from 'features/students/studentsSlice'

export type Builder = ActionReducerMapBuilder<EntityState<StudentTableDataProps> & StateProps>

export interface ExtraReducer {
  (builder: Builder): void
}
