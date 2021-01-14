import { EntityState, EntityId } from '@reduxjs/toolkit'
import { Laravel, RequestStatus } from 'api'
import { Party, Official, Student } from 'api/types/Models'

export type OfficialTableColumn =
  | 'id'
  | 'course_id'
  | 'student_number'
  | 'lastname'
  | 'firstname'
  | 'middlename'
  | 'suffix'

export type OfficialFields = Official.withStudent<OfficialTableColumn> & { removing?: boolean }

export type OfficialAddFields = Pick<Student.Fields, OfficialTableColumn | 'sex'> & {
  adding?: boolean
}

export interface StateProps {
  party: Party.Fields
  status: RequestStatus
  officials: EntityState<OfficialFields>

  search: {
    status: RequestStatus
    students: EntityState<OfficialAddFields>
    pagination: Pick<Laravel.Pagination.CustomPagination, 'from' | 'to' | 'total' | 'per_page'>
  }

  modalAddPicture: {
    open: boolean
    officialId: EntityId | null
    status: RequestStatus
  }
}
