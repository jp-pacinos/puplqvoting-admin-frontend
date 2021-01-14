import React from 'react'
import { useDispatch } from 'react-redux'

import { addModalOpen } from 'features/students/studentsSlice'
import AddModal from './AddModal'

interface Props {}

const AddStudent: React.FC<Props> = () => {
  const dispatch = useDispatch()

  const handleAddModal = () => {
    dispatch(addModalOpen())
  }

  return (
    <>
      <button onClick={handleAddModal} className="btn btn-blue btn-lg font-semibold">
        + New Student
      </button>

      <AddModal />
    </>
  )
}

export default React.memo(AddStudent)
