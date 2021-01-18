import { AxiosResponse, AxiosRequestConfig } from 'axios'
import {
  Session,
  Party,
  Official as ModelOfficial,
  Student,
  StudentVoteKeys,
} from 'api/types/Models'
import { Pagination, Validation } from 'api/types/Laravel'

export declare namespace ApiResponse {
  export type BasicStats = {
    votedCount: number
    registeredCount: number
    notVotedCount: number
    progress: string // percentage 0.00
  }

  export type Official = Pick<
    ModelOfficial.Fields,
    'id' | 'position_id' | 'student_id' | 'party_id'
  >

  export type OfficialWithVotes = Official & {
    votes: number
  }

  export type DetailedOfficial = Official & {
    student: Pick<Student.Fields, 'id' | 'lastname' | 'firstname' | 'middlename' | 'suffix'>
  }

  export type StudentKeys = Pick<StudentVoteKeys.Fields, 'id' | 'confirmation_code'> &
    Pick<
      Student.Fields,
      | 'student_number'
      | 'lastname'
      | 'firstname'
      | 'middlename'
      | 'suffix'
      | 'sex'
      | 'can_vote'
      | 'course_id'
    >

  /**
   * response
   */

  export interface getActiveElection extends Session.Fields {}

  export interface getElections extends Pagination.CustomSimplePagination<Session.Fields> {}

  export interface addElection {
    message: string
    session: Session.Fields
  }

  export interface getElection {
    election: Session.Fields
    parties: Pick<Party.Fields, 'id' | 'name'>[]
    officials: DetailedOfficial[]
    stats: {
      basic: BasicStats
      votes: OfficialWithVotes[]
    }
    reports: {
      election: string
    }
  }

  // stats

  export interface getStreamStats {
    basic: BasicStats
    votes: OfficialWithVotes[]
    summary: OfficialWithVotes[]
  }

  export interface getStudentVotes extends Array<OfficialWithVotes> {}

  // keys

  export interface getStudentKeys extends Pagination.CustomSimplePagination<StudentKeys> {}
}

export declare namespace ApiFunction {
  export type getActiveElectionParams = {
    config?: AxiosRequestConfig
  }

  export type getElectionsParams = {
    page?: number
    search?: string
    config?: AxiosRequestConfig
  }

  export type addElectionParams = {
    data: Pick<
      Session.Fillable,
      'name' | 'description' | 'year' | 'registration' | 'verification_type'
    >
    config?: AxiosRequestConfig
  }

  export type getElectionParams = {
    id: number
    config?: AxiosRequestConfig
  }

  export type deleteElectionParams = {
    id: number
    confirmation: string
    config?: AxiosRequestConfig
  }

  export type getElectionSettingsParams = {
    id: number
    config?: AxiosRequestConfig
  }

  export type updateElectionParams<T = any> = {
    id: number
    data: T
    config?: AxiosRequestConfig
  }

  export type getStudentVotesParams = {
    sessionId: number
    filters?: {
      partyId?: number | string
      positionId?: number | string
      officialId?: number | string
      courseId?: number | string
      gender?: string
    }
    config?: AxiosRequestConfig
  }

  export type getStreamStatsParams = {
    sessionId: number
    options?: getStudentVotesParams['filters']
    config?: AxiosRequestConfig
  }

  export type getStudentKeysParams = {
    sessionId: number
    filters?: {
      page?: number
      perpage?: number
      studentNumber?: string
      courseId?: string | number
      gender?: string
      code?: string | number
    }
    config?: AxiosRequestConfig
  }

  /**
   * functions
   */

  export interface getActiveElection {
    (params?: getActiveElectionParams): Promise<AxiosResponse<ApiResponse.getActiveElection>>
  }

  // crud

  export interface getElections {
    (params: getElectionsParams): Promise<AxiosResponse<ApiResponse.getElections>>
  }

  export interface addElection {
    (params: addElectionParams): Promise<AxiosResponse<ApiResponse.addElection>>
  }

  export interface updateElection {
    //
  }

  export interface getElection {
    (params: getElectionParams): Promise<AxiosResponse<ApiResponse.getElection>>
  }

  export interface deleteElection {
    (params: deleteElectionParams): Promise<AxiosResponse<{ message: string }>>
  }

  // settings

  export interface getElectionSettings {
    (params: getElectionSettingsParams): Promise<AxiosResponse<Session.Fields>>
  }

  export interface updateElectionStatus {
    (params: updateElectionParams<{ status: string }>): Promise<
      AxiosResponse<{
        message: string
        session: Partial<Pick<Session.Fields, 'active' | 'started_at' | 'registration_at'>> &
          Pick<Session.Fields, 'completed_at' | 'cancelled_at'>
      }>
    >
  }

  export interface updateElectionBasicDetails {
    (
      params: updateElectionParams<Pick<Session.Fillable, 'name' | 'year' | 'description'>>
    ): Promise<
      AxiosResponse<{
        message: string
        status: boolean
      }>
    >
  }

  export interface updateElectionRegistration {
    (params: updateElectionParams<{ registration: Session.Fields['registration'] }>): Promise<
      AxiosResponse<{
        message: string
        session: {
          registration: Session.Fields['registration']
          registration_at: Session.Fields['registration_at']
        }
      }>
    >
  }

  export interface updateElectionVerificationType {
    (
      params: updateElectionParams<{ verificationType: Session.Fields['verification_type'] }>
    ): Promise<
      AxiosResponse<{
        message: string
        verification_type: Session.Fields['verification_type']
      }>
    >
  }

  // actions

  export interface selectElection {
    (id: number): Promise<AxiosResponse<{ message: string }>>
  }

  export interface unselectelection {
    (id: number): Promise<AxiosResponse<{ message: string }>>
  }

  export interface startElection {
    (id: number): Promise<AxiosResponse<{ message: string; started_at: string }>>
  }

  export interface stopElection {
    (id: number): Promise<AxiosResponse<{ message: string; started_at: string | null }>>
  }

  export interface startElectionRegistration {
    (id: number): Promise<AxiosResponse<{ message: string; registration_at: string }>>
  }

  export interface stopElectionRegistration {
    (id: number): Promise<AxiosResponse<{ message: string; registration_at: string | null }>>
  }

  export interface updateElectionVerificationType {
    //
  }

  export interface updateElectionRegistration {
    //
  }

  export interface updateElectionStatus {
    //
  }

  // stats

  export interface getStreamStats {
    (params: getStreamStatsParams): Promise<AxiosResponse<ApiResponse.getStreamStats>>
  }

  export interface getStudentVotes {
    (params: getStudentVotesParams): Promise<AxiosResponse<ApiResponse.getStudentVotes>>
  }

  // keys

  export interface getStudentKeys {
    (params: getStudentKeysParams): Promise<AxiosResponse<ApiResponse.getStudentKeys>>
  }

  export interface addStudentKey {
    (params: { sessionId: number; studentId: number; config?: AxiosRequestConfig }): Promise<
      AxiosResponse<{
        message: string
        data: StudentVoteKeys.Fields
      }>
    >
  }

  export interface deleteStudentKey {
    (params: { sessionId: number; studentId: number; config?: AxiosRequestConfig }): Promise<
      AxiosResponse<{
        message: string
        success: boolean
      }>
    >
  }

  export interface addStudentKeysGroup {
    (params: { sessionId: number; studentIds: number[]; config?: AxiosRequestConfig }): Promise<
      AxiosResponse<{
        message: string
        data: StudentVoteKeys.Fields[]
      }>
    >
  }

  export interface deleteStudentKeysGroup {
    (params: { sessionId: number; studentIds: number[]; config?: AxiosRequestConfig }): Promise<
      AxiosResponse<{
        message: string
        affectedCount: number
      }>
    >
  }
}

export declare namespace ApiValidationResponse {
  export interface addElection extends Validation.UnprocessableEntity<Session.Fillable> {}
}
