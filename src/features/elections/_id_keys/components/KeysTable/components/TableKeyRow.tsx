import React, { forwardRef } from 'react'
import { EntityId } from '@reduxjs/toolkit'
import { useDispatch, useSelector, batch } from 'react-redux'

import { ApiResponse } from 'api/elections/types'
import { Checkbox } from 'common/components/Core'
import { CourseAcronym } from 'features/app/components'
import { snackbarOpen } from 'features/snackbar'
import { GenerateKey } from 'features/elections/components'
import {
  selectElectionId,
  selectStudentKeyById,
  studentKeyCheckboxToggle,
  incrementCheckedCount,
  decrementCheckedCount,
  setStudentCode,
} from 'features/elections/_id_keys'
import fullname from 'common/utils/fullname'

interface Props extends React.ComponentPropsWithRef<'tr'> {
  keyId: EntityId
}

const TableKeyRow: React.FC<Props> = forwardRef(({ keyId }, ref) => {
  const student = useSelector((state) => selectStudentKeyById(state, keyId))

  if (!student) return null

  let name = fullname(student)
  let gender = typeof student.sex === 'string' ? student.sex[0] : '-'
  let haveCode = student.confirmation_code !== null && !student.deleting
  let code = student.confirmation_code

  return (
    <tr ref={ref}>
      <td>
        <StudentCheckbox keyId={keyId} haveCode={haveCode} checked={student.checked} />
      </td>
      <td>{student.student_number}</td>
      <td>{name}</td>
      <td>{gender}</td>
      <td>
        <CourseAcronym id={student.course_id} />
      </td>
      <td>{haveCode ? code : <ButtonGenerate keyId={keyId} studentId={student.student_id} />}</td>
    </tr>
  )
})

export default React.memo(TableKeyRow)

//

interface StudentCheckboxProps extends React.ComponentPropsWithoutRef<'input'> {
  keyId: EntityId
  haveCode: boolean
  checked?: boolean
}

const StudentCheckbox: React.FC<StudentCheckboxProps> = ({
  keyId,
  haveCode,
  checked = false,
  ...rest
}) => {
  const dispatch = useDispatch()

  const handleClickToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    batch(() => {
      dispatch(studentKeyCheckboxToggle({ id: keyId, checked: e.target.checked }))

      e.target.checked
        ? dispatch(incrementCheckedCount({ haveCode }))
        : dispatch(decrementCheckedCount({ haveCode }))
    })
  }

  return (
    <Checkbox
      value={keyId}
      checked={checked}
      onChange={handleClickToggle}
      className="block m-auto text-blue-400"
      {...rest}
    />
  )
}

interface ButtonGenerateProps extends React.ComponentPropsWithoutRef<'button'> {
  keyId: EntityId
  studentId: number
}

const ButtonGenerate: React.FC<ButtonGenerateProps> = ({ keyId, studentId, ...rest }) => {
  const electionId = useSelector(selectElectionId)
  const dispatch = useDispatch()

  const handleSuccess = (data: ApiResponse.addStudentKey) => {
    batch(() => {
      dispatch(
        snackbarOpen({
          text: data.message,
          duration: 3000,
          position: { x: 'bottom', y: 'left' },
        })
      )

      dispatch(
        setStudentCode({
          keyId,
          code: data.data.confirmation_code as string,
        })
      )
    })
  }

  return (
    <GenerateKey sessionId={electionId as number} studentId={studentId} onSuccess={handleSuccess}>
      {({ generate, loading }) => (
        <button
          onClick={generate}
          className="btn btn-gray btn-sm hover:bg-blue-500 hover:text-white"
          disabled={loading}
          {...rest}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      )}
    </GenerateKey>
  )
}
