export interface Pagination {
  page?: string
  perpage?: string
}

export interface ParamQuery extends Pagination {
  s?: string
  course?: string
  year?: string
  gender?: string
  voter?: string
}

export interface FilterProps {
  course: string
  year: string
  gender: string
  voter: string
}
