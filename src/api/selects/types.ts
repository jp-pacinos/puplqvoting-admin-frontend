import { AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  Session as SessionModel,
  Course as CourseModel,
  Position as PositionModel,
} from 'api/types/Models'

export declare namespace Models {
  export type Session = Pick<SessionModel.Fields, 'id' | 'name' | 'year' | 'created_at'>
  export type Course = Pick<CourseModel.Fields, 'id' | 'name' | 'acronym'>
  export type Position = Pick<
    PositionModel.Fields,
    'id' | 'name' | 'order' | 'per_party_count' | 'choose_max_count'
  >
}

export declare namespace ApiResponse {
  export type getAll = {
    sessions: Models.Session[]
    courses: Models.Course[]
    positions: Models.Position[]
  }
}

export declare namespace ApiFunction {
  export interface getAll {
    (options: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse.getAll>>
  }
}
