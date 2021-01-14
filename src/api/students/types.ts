import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Validation, Pagination } from 'api/types/Laravel'
import { Student as StudentTable } from 'api/types/Models'

export declare namespace ApiResponse {
  export interface getStudents
    extends Pagination.CustomPagination<
      Omit<StudentTable.Fields, 'birthdate' | 'email' | 'created_at' | 'updated_at'> & {
        official_id: number | null
      }
    > {}

  export interface getStudent extends StudentTable.Fields {}

  export interface createStudent {
    message: string
    data: StudentTable.Fields
  }

  export interface updateStudent {
    message: string
    data: StudentTable.Fields
  }

  export interface deleteStudent {
    message: string
    success: boolean
  }

  export interface groupStudentsUpdate {
    message: string
    updatedCount: number
  }

  export interface groupStudentsDelete {
    message: 'string'
    deletedCount: number
  }
}

export declare namespace ApiFunction {
  export type studentsFilter = {
    studentNumber?: string
    courseId?: string | number
    yearLevel?: string | number
    gender?: string
    voter?: string | number
  }

  export type getStudentsParams = {
    page: number
    perPage: number
    filters: studentsFilter
    options?: AxiosRequestConfig
  }

  export type groupStudentsUpdateParams = Pick<
    StudentTable.Fields,
    'course_id' | 'sex' | 'can_vote'
  > & {
    studentIds: StudentTable.Fields['id'][]
  }

  /**
   * API functions
   */

  export interface getStudents {
    (props: getStudentsParams): Promise<AxiosResponse<ApiResponse.getStudents>>
  }

  export interface getStudent {
    (id: number): Promise<AxiosResponse<ApiResponse.getStudent>>
  }

  export interface createStudent {
    (data: StudentTable.Fillable): Promise<AxiosResponse<ApiResponse.createStudent>>
  }

  export interface updateStudent {
    (id: number, data: StudentTable.Fillable): Promise<AxiosResponse<ApiResponse.updateStudent>>
  }

  export interface deleteStudent {
    (id: number): Promise<AxiosResponse<ApiResponse.deleteStudent>>
  }

  /**
   * Groups
   */

  export interface groupStudentsUpdate {
    (data: groupStudentsUpdateParams): Promise<AxiosResponse<ApiResponse.groupStudentsUpdate>>
  }

  export interface groupStudentsDelete {
    (ids: StudentTable.Fields['id'][]): Promise<AxiosResponse<ApiResponse.groupStudentsDelete>>
  }
}

export declare namespace ApiValidationResponse {
  export interface addStudent extends Validation.UnprocessableEntity<StudentTable.Fillable> {}

  export interface updateStudent extends Validation.UnprocessableEntity<StudentTable.Fillable> {}
}
