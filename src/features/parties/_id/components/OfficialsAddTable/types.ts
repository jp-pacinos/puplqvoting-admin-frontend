import { Student } from 'api/types/Models'

export type SearchFilters = keyof Pick<
  Student.Fillable,
  'student_number' | 'lastname' | 'firstname' | 'middlename' | 'course_id'
>

export type StudentFilters = {
  [P in SearchFilters]: string
}

export interface UseFilters {
  useFilters: () => [
    [StudentFilters, StudentFilters],
    React.Dispatch<React.SetStateAction<StudentFilters>>
  ]
}
