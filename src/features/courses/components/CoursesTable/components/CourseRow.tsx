import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { EntityId, unwrapResult } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai'
import { FiX } from 'react-icons/fi'
import { HiOutlineTrash } from 'react-icons/hi'

import { AppDispatch } from 'app/store'
import { Course } from 'api/types/Models'
import { IconButton, Input } from 'common/components/Core'
import { courseUpdated } from 'features/app/appSlice'
import {
  selectCourseById,
  allowEditCourse,
  endEditCourse,
  deleteModalOpen,
  updateCourseAsync,
} from 'features/courses'

interface Props extends React.ComponentPropsWithRef<'tr'> {
  courseId: EntityId
}

const CourseRow: React.FC<Props> = forwardRef(({ courseId }, ref) => {
  const course = useSelector((state) => selectCourseById(state, courseId))

  const [name, setName] = useState('')
  const [acronym, setAcronym] = useState('')

  const firstInput = useRef<HTMLInputElement>(null)

  // reset inputs and focus to course name
  useEffect(() => {
    if (course?.validating) return
    if (course?.editing) {
      setName(course?.name || '')
      setAcronym(course?.acronym || '')
      firstInput.current?.focus()
    }
  }, [course?.acronym, course?.editing, course?.name, course?.validating])

  if (!course) return null

  let isEditing: boolean = Boolean(course.editing)
  let renderCourseName: React.ReactNode = course.name
  let renderAcronym: React.ReactNode = course.acronym

  if (isEditing) {
    renderCourseName = (
      <div>
        <Input
          ref={firstInput}
          name="course"
          placeholder="Course name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name.length === 0 && <p className="p-1 text-red-500 text-xs">Requried</p>}
      </div>
    )
    renderAcronym = (
      <div>
        <Input
          name="acronym"
          placeholder="Acronym"
          value={acronym}
          onChange={(e) => setAcronym(e.target.value.toUpperCase())}
          maxLength={7}
        />
        {acronym.length === 0 && <p className="p-1 text-red-500 text-xs">Requried</p>}
      </div>
    )
  }

  return (
    <tr ref={ref} className={course.deleteing || course.updating ? 'opacity-40' : undefined}>
      <td>{course.id}</td>
      <td>{renderCourseName}</td>
      <td>{renderAcronym}</td>
      <td>
        <div className="flex flex-wrap justify-evenly items-center">
          {isEditing ? (
            <>
              <ButtonUpdate courseId={course.id} changes={{ name, acronym }} />
              <ButtoCancelEdit courseId={course.id} />
            </>
          ) : (
            <>
              <ButtonEdit courseId={course.id} />
              <ButtonDelete courseId={course.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  )
})

export default React.memo(CourseRow)

//

const ButtonEdit: React.FC<{ courseId: EntityId }> = ({ courseId }) => {
  const dispatch = useDispatch()

  return (
    <IconButton
      onClick={() => dispatch(allowEditCourse({ id: courseId }))}
      className="text-blue-500 bg-blue-50  hover:bg-blue-500 hover:text-white"
    >
      <AiOutlineEdit />
    </IconButton>
  )
}

const ButtoCancelEdit: React.FC<{ courseId: EntityId }> = ({ courseId }) => {
  const dispatch = useDispatch()

  return (
    <IconButton
      onClick={() => dispatch(endEditCourse({ id: courseId }))}
      className="text-gray-500 bg-gray-200  hover:bg-gray-500 hover:text-white"
    >
      <FiX />
    </IconButton>
  )
}

const ButtonUpdate: React.FC<{ courseId: EntityId; changes: Course.Fillable }> = ({
  courseId,
  changes,
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleUpdate = async () => {
    if (changes.name.length === 0 || changes.acronym.length === 0 || changes.acronym.length > 7) {
      return false
    }

    try {
      let res = await dispatch(updateCourseAsync({ id: courseId as number, changes }))
      unwrapResult(res)
      dispatch(courseUpdated({ id: courseId, changes }))
    } catch (e) {
      //
    }
  }

  return (
    <IconButton
      className="text-green-500 bg-green-100 hover:bg-green-500 hover:text-white"
      onClick={handleUpdate}
    >
      <AiOutlineCheck />
    </IconButton>
  )
}

const ButtonDelete: React.FC<{ courseId: EntityId }> = ({ courseId }) => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <IconButton
      className="text-red-500 bg-red-50 hover:bg-red-500 hover:text-white"
      onClick={() => dispatch(deleteModalOpen({ id: courseId }))}
    >
      <HiOutlineTrash />
    </IconButton>
  )
}
