export declare namespace Pagination {
  export interface SimplePagination<T = any> {
    current_page: number
    data: T[]
    first_page_url: string | null
    from: number
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
  }

  export interface CustomSimplePagination<T = any> extends SimplePagination<T> {
    total: number
  }

  export interface CustomPagination<T = any> {
    current_page: number
    data: T[]
    per_page: number
    from: number
    to: number
    total: number
    //
    first_page_url?: string | null
    next_page_url?: string | null
    prev_page_url?: string | null
    path?: string
  }
}

export declare namespace Validation {
  /**
   * 422 status code - unprocessable entity
   */
  export interface UnprocessableEntity<T = {}> {
    message: string
    errors: {
      [K in keyof Partial<T>]: string[]
    }
  }
}
