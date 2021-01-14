import React from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { HiOutlineTrash } from 'react-icons/hi'

import { RootState } from 'app/store'
import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import {
  selectDeleteModal,
  selectStudentById,
  deleteModalClose,
  deleteStudent,
} from 'features/students/studentsSlice'

const DeleteModal: React.FC<{}> = () => {
  const { open, studentId } = useSelector(selectDeleteModal)
  const student = useSelector((state: RootState) => selectStudentById(state, studentId))
  const dispatch = useDispatch()

  const onModalClose = () => {
    dispatch(deleteModalClose())
  }

  const onClickDelete = () => {
    batch(() => {
      dispatch(deleteModalClose())

      if (student) {
        dispatch(deleteStudent({ studentId: student.id }))
      }
    })
  }

  let studentNumber = student ? student.student_number : ''

  return (
    <Modal open={open} onClose={onModalClose} name="delete-modal" position="center">
      <ModalBody>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <HiOutlineTrash className="h-6 w-6 text-red-600" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Delete account {studentNumber}?
            </h3>
            <div className="mt-2">
              <p className="text-sm leading-5 text-gray-500 mb-2">
                Are you sure you want to delete this account? All the data will be permanently
                removed. This action cannot be undone.
              </p>
              <p className="text-sm leading-5 text-red-500">
                This includes votes and registrations done by this student.
              </p>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <span className="flex w-full sm:ml-3 sm:w-auto">
          <button onClick={onClickDelete} type="button" className="btn btn-red w-full py-2 sm:w-40">
            Yes, delete this
          </button>
        </span>
        <span className="mt-3 flex w-full sm:mt-0 sm:w-auto">
          <button
            onClick={onModalClose}
            type="button"
            className="btn btn-white w-full py-2 sm:w-24"
          >
            Cancel
          </button>
        </span>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteModal
