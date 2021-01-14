import React from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch } from 'react-redux'

import { AppDispatch } from 'app/store'
import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import { deleteParty } from 'features/parties/partiesSlice'
import { PartyDeleteProps } from './types'

interface Props extends PartyDeleteProps {
  useOpenModal: () => [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const PartyDeleteModal: React.FC<Props> = ({
  id,
  name,
  useOpenModal,
  onSuccess = () => {},
  onFail = () => {},
}) => {
  const [openModal, setOpenModal] = useOpenModal()
  const dispatch = useDispatch<AppDispatch>()

  const onModalClose = () => {
    setOpenModal(false)
  }

  const onClickDelete = async () => {
    try {
      setOpenModal(false)

      let res = await dispatch(deleteParty({ id: id as number }))
      unwrapResult(res)

      onSuccess()
    } catch (e) {
      onFail(e)
    }
  }

  return (
    <Modal open={openModal} onClose={onModalClose} name="delete-party-modal" position="center">
      <ModalBody>
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <HiOutlineTrash className="h-6 w-6 text-red-600" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Delete Party {name}?
            </h3>
            <div className="mt-2">
              <p className="text-sm leading-5 text-gray-500">
                Are you sure you want to delete this party? All the data will be permanently
                removed. This action cannot be undone.
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

export default PartyDeleteModal
