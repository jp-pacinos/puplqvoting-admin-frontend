import { EntityState, EntityId } from '@reduxjs/toolkit'
import { RequestStatus } from 'api/types'
import { Student as StudentModel } from 'api/types/Models'
import { ApiValidationResponse } from 'api/students'

export type RowExtraFileds = Pick<
  StudentModel.Fields,
  'birthdate' | 'email' | 'created_at' | 'updated_at'
>

export type RowFields = Omit<
  StudentModel.Fields & { official_id: number | null },
  keyof RowExtraFileds
>

export interface StudentTableDataProps extends RowFields, Partial<RowExtraFileds> {
  checked?: boolean
  deleting?: boolean
}

export interface StateProps extends EntityState<StudentTableDataProps> {
  status: RequestStatus
  pagination: {
    current_page: number
    per_page: number
    from: number
    to: number
    total: number
  }

  checkedCount: { students: number; officers: number }

  addModal: {
    open: boolean
    status: RequestStatus | 'validating'
    validation: ApiValidationResponse.addStudent
  }

  editModal: {
    open: boolean
    studentId: EntityId
    status: RequestStatus | 'validating'
    validation: ApiValidationResponse.updateStudent
  }

  deleteModal: {
    open: boolean
    studentId: EntityId
  }

  groupEditModal: {
    open: boolean
    status: RequestStatus
    studentIds: StudentTableDataProps['id'][]
  }

  groupDeleteModal: {
    open: boolean
    studentIds: StudentTableDataProps['id'][]
  }
}
