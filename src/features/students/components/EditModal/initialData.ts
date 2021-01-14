import { StudentTableDataProps } from 'features/students/studentsSlice'

const localState: StudentTableDataProps = {
  id: 0,
  student_number: '',
  firstname: '',
  lastname: '',
  middlename: null,
  suffix: null,
  sex: '' as any,
  can_vote: '' as any,
  official_id: null,
  course_id: 0,

  // edit modal
  birthdate: '',
  email: '',
  created_at: '',
  updated_at: '',

  // status
  checked: false,
  deleting: false,
}

export default localState
