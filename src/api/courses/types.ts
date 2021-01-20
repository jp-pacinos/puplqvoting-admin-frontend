import { AxiosResponse, AxiosRequestConfig } from 'axios'
import { Course } from 'api/types/Models'
import { Validation } from 'api/types/Laravel'

export declare namespace ApiResponse {
  export interface getCourses extends Array<Course.Fields> {}

  export interface addCourse {
    message: string
    course: Course.Fields
  }

  export interface updateCourse {
    message: string
    course: Course.Fields
  }

  export interface deleteCourse {
    message: string
    status: boolean
  }
}

export declare namespace ApiFunction {
  export type getCoursesParams = { search?: string; config?: AxiosRequestConfig }

  export type addCourseParams = {
    data: Course.Fillable
    config?: AxiosRequestConfig
  }

  export type updateCourseParams = {
    id: number
    changes: Course.Fillable
    config?: AxiosRequestConfig
  }

  export type deleteCourseParams = {
    id: number
    config?: AxiosRequestConfig
  }

  /**
   * functions
   */

  export interface getCourses {
    (params?: getCoursesParams): Promise<AxiosResponse<ApiResponse.getCourses>>
  }

  export interface addCourse {
    (params: addCourseParams): Promise<AxiosResponse<ApiResponse.addCourse>>
  }

  export interface updateCourse {
    (params: updateCourseParams): Promise<AxiosResponse<ApiResponse.updateCourse>>
  }

  export interface deleteCourse {
    (params: deleteCourseParams): Promise<AxiosResponse<ApiResponse.deleteCourse>>
  }
}

export declare namespace ApiValidationResponse {
  export interface addCourse extends Validation.UnprocessableEntity<Course.Fillable> {}
}
