import React from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { HiOutlineTrash } from 'react-icons/hi'

import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import {
  selectGroupDeleteModal,
  selectCheckedCount,
  selectElectionId,
  selectStudentKeys,
  groupDeleteModalClose,
  groupDeleteKeys,
} from 'features/elections/_id_keys'

interface Props {}

const ModalGroupDeleteKey: React.FC<Props> = () => {
  const electionId = useSelector(selectElectionId)
  const studentKeys = useSelector(selectStudentKeys)
  const { open } = useSelector(selectGroupDeleteModal)

  const { withCode: withCodeCount } = useSelector(selectCheckedCount)
  const dispatch = useDispatch()

  const onModalClose = () => {
    dispatch(groupDeleteModalClose())
  }

  const onClickDelete = () => {
    if (!studentKeys) return

    let studentIds: number[] = []
    for (let i = 0; i < studentKeys.length; i++) {
      if (studentKeys[i].checked && studentKeys[i].confirmation_code !== null) {
        studentIds.push(studentKeys[i].id)
      }
    }

    batch(() => {
      dispatch(groupDeleteModalClose())
      dispatch(groupDeleteKeys({ sessionId: electionId as number, studentIds }))
    })
  }

  return (
    <Modal open={open} onClose={onModalClose} name="group-delete-key-modal" position="center">
      <ModalBody>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <HiOutlineTrash className="h-6 w-6 text-red-600" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Are you sure?
            </h3>
            <div className="mt-2">
              <p className="text-sm leading-5 text-gray-500">
                It will prevent the student to verify its vote.
              </p>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <span className="flex w-full sm:ml-3 sm:w-auto">
          <button onClick={onClickDelete} type="button" className="btn btn-red w-full py-2">
            Delete {`(${withCodeCount})`} selected
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

export default ModalGroupDeleteKey
