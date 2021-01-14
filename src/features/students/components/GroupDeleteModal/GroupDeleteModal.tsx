import React from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { HiOutlineTrash } from 'react-icons/hi'

import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import {
  selectGroupDeleteModal,
  selectCheckedCount,
  groupDeleteModalClose,
  groupDeleteStudents,
} from 'features/students/studentsSlice'

const GroupDeleteModal: React.FC<{}> = () => {
  const { open, studentIds } = useSelector(selectGroupDeleteModal)
  const { students: studentsCount } = useSelector(selectCheckedCount)
  const dispatch = useDispatch()

  const onModalClose = () => {
    dispatch(groupDeleteModalClose())
  }

  const onClickDelete = () => {
    batch(() => {
      dispatch(groupDeleteModalClose())
      dispatch(groupDeleteStudents({ studentIds }))
    })
  }

  return (
    <Modal open={open} onClose={onModalClose} name="group-delete-modal" position="center">
      <ModalBody>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <HiOutlineTrash className="h-6 w-6 text-red-600" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Delete selected account{'(s)'}?
            </h3>
            <div className="mt-2">
              <p className="text-sm leading-5 text-gray-500">
                Are you sure you want to delete this account{'(s)'}? All the data will be
                permanently removed. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <span className="flex w-full sm:ml-3 sm:w-auto">
          <button onClick={onClickDelete} type="button" className="btn btn-red w-full py-2">
            Delete {`(${studentsCount})`} selected
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

export default GroupDeleteModal
