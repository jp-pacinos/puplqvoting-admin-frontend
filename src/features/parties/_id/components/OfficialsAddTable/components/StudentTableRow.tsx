import React from 'react'
import { EntityId, nanoid } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineCheck } from 'react-icons/ai'

import { IconButton } from 'common/components/Core'
import { CourseAcronym } from 'features/app/components'
import { selectStudentById, selectPartyId, makeOfficial } from 'features/parties/_id'
import fullname from 'common/utils/fullname'

const StudentTableRow: React.FC<{ id: EntityId }> = ({ id }) => {
  const student = useSelector((state) => selectStudentById(state, id))
  const partyId = useSelector(selectPartyId)
  const dispatch = useDispatch()

  if (!student) return null

  const handleClick = () => {
    dispatch(makeOfficial({ partyId: partyId, studentId: id as number, tempId: nanoid() }))
  }

  let name = fullname(student)
  let addingStyle = student.adding ? 'hidden' : undefined

  return (
    <tr className={addingStyle}>
      <td>
        <IconButton
          onClick={handleClick}
          className="text-sm text-green-500 bg-green-50 hover:bg-green-500 hover:text-white"
        >
          <AiOutlineCheck />
        </IconButton>
      </td>
      <td>{student.student_number}</td>
      <td>{name}</td>
      <td>{student.sex}</td>
      <td>
        <CourseAcronym id={student.course_id} />
      </td>
    </tr>
  )
}

export default StudentTableRow
