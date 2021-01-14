import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineEdit } from 'react-icons/ai'
import { FiX } from 'react-icons/fi'

import store from 'app/store'
import FloatBox, { PositionProps } from 'common/components/Core/FloatBox'
import {
  StudentTableDataProps as Student,
  // selects
  selectCheckedCount,
  // actions
  studentsAllChecked,
  groupEditModalOpen,
  groupDeleteModalOpen,
} from 'features/students/studentsSlice'

const getStudentsIds = (includeOfficers = true) => {
  const students = store.getState().students.entities

  let studentIds: Student['id'][] = []
  for (const id in students) {
    if (!students[id]?.checked) continue

    if (includeOfficers) {
      studentIds.push(+id)
      continue
    }

    // count students only
    if (!students[id]?.official_id) studentIds.push(+id)
  }

  return studentIds
}

const defaultPosition = { x: 'middle', y: 'bottom' } as PositionProps

const GroupActionButtons: React.FC<{}> = () => {
  const checkedCount = useSelector(selectCheckedCount)
  const dispatch = useDispatch()

  const onClickClose = () => {
    dispatch(studentsAllChecked(false))
  }

  const onClickUpdate = () => {
    let studentIds: Student['id'][] = getStudentsIds()
    dispatch(groupEditModalOpen(studentIds))
  }

  const onClickDelete = () => {
    let studentIds: Student['id'][] = getStudentsIds(false)
    dispatch(groupDeleteModalOpen(studentIds))
  }

  let countTotal = checkedCount.students + checkedCount.officers
  let open = countTotal > 0

  return (
    <FloatBox open={open} onClose={onClickClose} position={defaultPosition}>
      <div className="card rounded-lg shadow-2xl mb-0 z-10">
        <div className="flex items-center">
          <div className="mr-3">
            <p className="text-gray-800 text-sm font-semibold uppercase">Actions:</p>
          </div>
          <button
            onClick={onClickUpdate}
            className="mx-1 rounded-full text-md bg-blue-400 text-white hover:bg-blue-700 px-4 py-1 focus:outline-none transition-colors ease-in-out duration-100"
          >
            <EditIcon /> Edit {`${countTotal > 0 ? `(${countTotal})` : ''}`}
          </button>
          {checkedCount.students > 0 && (
            <button
              onClick={onClickDelete}
              className="mx-1 rounded-full text-md bg-red-400 text-white hover:bg-red-700 px-4 py-1 focus:outline-none transition-colors ease-in-out duration-100"
            >
              <DeleteIcon /> Delete {`(${checkedCount.students})`}
            </button>
          )}
          <button
            onClick={onClickClose}
            className="p-2 ml-1 rounded-full hover:bg-gray-200  focus:outline-none transition-colors ease-in-out duration-100"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </FloatBox>
  )
}

export default React.memo(GroupActionButtons)

const EditIcon = memo(() => <AiOutlineEdit className="inline text-2xl" />)
const DeleteIcon = memo(() => <HiOutlineTrash className="inline text-2xl" />)
const CloseIcon = memo(() => <FiX className="text-gray-800 text-2xl" />)
