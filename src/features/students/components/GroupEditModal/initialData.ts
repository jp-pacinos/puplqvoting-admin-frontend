import { Student as StudentModel } from 'api/types/Models'

const localState: Pick<StudentModel.Fields, 'sex' | 'can_vote' | 'course_id'> = {
  sex: '' as any,
  can_vote: '' as any,
  course_id: '' as any,
}

export default localState
