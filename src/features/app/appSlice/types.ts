import { EntityState } from '@reduxjs/toolkit'
import { Student as StudentModel } from 'api/types/Models'
import { Session, UserAdmin } from 'api/types/Models'
import { Models } from 'api/selects'

export interface OptionProps<T> {
  text: string
  value: T
}

export interface StateProps {
  /**
   * auth
   */
  auth: {
    token: string | null
    user: Partial<Pick<UserAdmin.Fields, 'id' | 'name' | 'email'>>
  }

  /**
   * selects data
   */
  sex: OptionProps<StudentModel.Gender | ''>[]
  voter: OptionProps<StudentModel.Voter | ''>[]
  verificationType: OptionProps<Session.Fields['verification_type'] | ''>[]
  yesNo: OptionProps<'1' | '0'>[]
  sessions: EntityState<Models.Session>
  courses: EntityState<Models.Course>
  positions: EntityState<Models.Position>
}
