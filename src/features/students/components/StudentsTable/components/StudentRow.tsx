import React, { memo, forwardRef } from 'react'
import { EntityId } from '@reduxjs/toolkit'
import { useSelector, useDispatch, batch } from 'react-redux'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineEdit } from 'react-icons/ai'

import { RootState } from 'app/store'
import fullname from 'common/utils/fullname'
import { IconButton, Checkbox } from 'common/components/Core'
import CourseAcronym from 'features/app/components/CourseAcronym'

import { selectStudentById } from 'features/students/studentsSlice/selectors'
import {
  studentChecked,
  deleteModalOpen,
  editModalOpen,
} from 'features/students/studentsSlice/actions'
import { fetchStudent } from 'features/students/studentsSlice/actionsAsync'

interface Props extends React.ComponentPropsWithRef<'tr'> {
  studentId: EntityId
}

const StudentRow: React.FC<Props> = forwardRef(({ studentId }, ref) => {
  const student = useSelector((state: RootState) => selectStudentById(state, studentId))
  const dispatch = useDispatch()

  if (!student) return null

  const onCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(studentChecked({ id: parseInt(e.currentTarget.value), checked: e.target.checked }))
  }

  const onClickEdit = () => {
    batch(async () => {
      dispatch(editModalOpen(student.id))
      dispatch(fetchStudent({ studentId: student.id }))
    })
  }

  const onClickDelete = () => {
    dispatch(deleteModalOpen(student.id))
  }

  let rowClassName = undefined
  let cantVoteCss = student.can_vote.toString() === '0' ? 'text-red-500' : undefined
  let deletingCss = student.deleting ? 'hidden' : undefined

  if (deletingCss) {
    rowClassName = deletingCss
    if (cantVoteCss) rowClassName += ' ' + cantVoteCss
  } else {
    if (cantVoteCss) rowClassName = cantVoteCss
  }

  let name = fullname(student)
  let sex = typeof student.sex === 'string' ? student.sex[0] : '-'
  let checked = student.checked ? student.checked : false

  return (
    <tr key={student.id} className={rowClassName} ref={ref}>
      <td>
        <Checkbox
          className="block m-auto text-blue-400"
          value={student.id}
          checked={checked}
          onChange={onCheckChange}
        />
      </td>
      <td>{student.student_number}</td>
      <td>
        {name}
        {student.official_id && (
          <span className="ml-2 tracking-wide bg-green-100 text-green-500 font-semibold text-sm px-2 py-0 rounded-full text-left">
            officer
          </span>
        )}
      </td>
      <td>{sex}</td>
      <td>
        <CourseAcronym id={student.course_id} />
      </td>
      <td>
        <div className="flex flex-wrap justify-evenly items-center">
          <IconButton
            onClick={onClickEdit}
            className="text-blue-500 bg-blue-50  hover:bg-blue-500 hover:text-white"
          >
            <AiOutlineEdit />
          </IconButton>
          {!student.official_id && (
            <IconButton
              className="text-red-500 bg-red-50 hover:bg-red-500 hover:text-white"
              onClick={onClickDelete}
            >
              <HiOutlineTrash />
            </IconButton>
          )}

          {/* 
            // TODO: optional (feature) make 'add officer' btn
          */}
        </div>
      </td>
    </tr>
  )
})

// memo() will help this component not to re-render
// after other StudentRow is removed from the lists
export default memo(StudentRow)
