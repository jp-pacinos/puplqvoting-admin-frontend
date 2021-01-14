import { Student as StudentModel } from 'api/types/Models'

const localState: StudentModel.Fillable = {
  student_number: '',
  firstname: '',
  lastname: '',
  middlename: '',
  suffix: '',
  sex: '' as any,
  can_vote: '' as any,
  course_id: 0,
  birthdate: '',
  email: '',
}

export default localState
