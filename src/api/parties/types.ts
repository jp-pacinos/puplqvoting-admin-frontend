import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Pagination, Validation } from 'api/types/Laravel'
import { Party as PartyModel, Student, Official } from 'api/types/Models'

export declare namespace ApiResponse {
  export interface getParties extends Pagination.CustomSimplePagination<PartyModel.Fields> {}
  export interface getParty
    extends PartyModel.withOfficialsWithStudent<
      'id' | 'course_id' | 'firstname' | 'lastname' | 'middlename' | 'student_number' | 'suffix'
    > {}

  export interface addParty {
    message: string
    party: PartyModel.Fields
  }

  export interface updateParty {
    message: string
    success: boolean
    party: PartyModel.Fields
  }

  export interface deleteParty {
    message: string
    success: boolean
  }

  // ~ officials

  export interface makeOfficial {
    message: string
    official: Official.Fields
  }

  export interface removeOfficial {
    message: string
    success: boolean
  }

  export interface updateOfficialPosition {
    message: string
    success: boolean
    position_id: number
  }

  export interface updateOfficialPicture {
    message: string
    image_url: string
  }

  export interface deleteOfficialPicture {
    message: string
    success: boolean
  }

  //

  export interface studentsSearch
    extends Pagination.CustomPagination<
      Pick<
        Student.Fields,
        | 'id'
        | 'student_number'
        | 'lastname'
        | 'firstname'
        | 'middlename'
        | 'suffix'
        | 'sex'
        | 'course_id'
      >
    > {}
}

export declare namespace ApiFunction {
  export type getPartiesParams = {
    page?: number
    filters?: { s?: string; session?: number }
    options?: AxiosRequestConfig
  }

  export type getPartyParams = { id: number | string; options?: AxiosRequestConfig }

  export type addPartyParams = { party: PartyModel.Fillable; options?: AxiosRequestConfig }

  export type updatePartyParams = {
    id: number
    changes: PartyModel.Fillable
    options?: AxiosRequestConfig
  }

  export type deletePartyParams = { id: number; options?: AxiosRequestConfig }

  // ~ offficials

  export type studentsSearchParams = {
    page: number
    filters: {
      studentnumber?: string
      firstname?: string
      lastname?: string
      middlename?: string
      courseid?: string
    }
    options?: AxiosRequestConfig
  }

  export type makeOfficialParams = { partyId: number; studentId: number }

  export type removeOfficialParams = { partyId: number; officialId: number }

  export type updateOfficialPositionParams = {
    officialId: number
    positionId: number
  }

  export type updateOfficialPictureParams = {
    officialId: number
    newImage: Blob | File
  }

  export type deleteOfficialPictureParams = {
    officialId: number
  }

  /**
   * API functions
   */

  export interface getParties {
    (params: getPartiesParams): Promise<AxiosResponse<ApiResponse.getParties>>
  }

  export interface getParty {
    (params: getPartyParams): Promise<AxiosResponse<ApiResponse.getParty>>
  }

  export interface addParty {
    (params: addPartyParams): Promise<AxiosResponse<ApiResponse.addParty>>
  }

  export interface updateParty {
    (params: updatePartyParams): Promise<AxiosResponse<ApiResponse.updateParty>>
  }

  export interface deleteParty {
    (params: deletePartyParams): Promise<AxiosResponse<ApiResponse.deleteParty>>
  }

  // ~ officials

  export interface studentsSearch {
    (params: studentsSearchParams): Promise<AxiosResponse<ApiResponse.studentsSearch>>
  }

  export interface makeOfficial {
    (params: makeOfficialParams): Promise<AxiosResponse<ApiResponse.makeOfficial>>
  }

  export interface removeOfficial {
    (params: removeOfficialParams): Promise<AxiosResponse<ApiResponse.removeOfficial>>
  }

  export interface updateOfficialPosition {
    (params: updateOfficialPositionParams): Promise<
      AxiosResponse<ApiResponse.updateOfficialPosition>
    >
  }

  export interface updateOfficialPicture {
    (params: updateOfficialPictureParams): Promise<AxiosResponse<ApiResponse.updateOfficialPicture>>
  }

  export interface deleteOfficialPicture {
    (params: deleteOfficialPictureParams): Promise<AxiosResponse<ApiResponse.deleteOfficialPicture>>
  }
}

export declare namespace ApiValidationResponse {
  export interface addParty extends Validation.UnprocessableEntity<PartyModel.Fillable> {}

  export interface updateParty extends Validation.UnprocessableEntity<PartyModel.Fillable> {}

  export interface makeOfficial extends Validation.UnprocessableEntity<'student_id'> {}

  export interface updateOfficialPosition extends Validation.UnprocessableEntity<'position_id'> {}
}
