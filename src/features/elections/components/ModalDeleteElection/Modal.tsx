import React, { useState, useRef, useCallback, useEffect } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

import { deteleElection } from 'api/elections'
import { RequestStatus } from 'common/constants'
import { Input } from 'common/components/Core'
import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import { Status, ModalDeleteElectionProps } from './types'

interface Props extends ModalDeleteElectionProps {
  useOpenModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const ModalDeleteElection: React.FC<Props> = ({
  electionName,
  electionId,
  useOpenModal,
  onSuccess = () => {},
  onFail = () => {},
}) => {
  const [openModal, setOpenModal] = useOpenModal
  const [status, setStatus] = useState<Status>('idle')

  const [confirmation, setConfirmation] = useState('')

  const firstInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (openModal) {
      firstInput.current?.focus()
      return
    }
    setConfirmation('')
  }, [openModal])

  const onModalClose = useCallback(() => {
    setOpenModal(false)
  }, [setOpenModal])

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setStatus(RequestStatus.pending)

    try {
      const response = await deteleElection({
        id: electionId,
        confirmation: confirmation,
      })

      onSuccess(response.data)
      setOpenModal(false)
      setStatus(RequestStatus.success)
    } catch (e) {
      setStatus(RequestStatus.failure)
      onFail(e)
    }
  }

  return (
    <Modal
      name="detele-election-modal"
      position="center"
      size="lg"
      open={openModal}
      onClose={onModalClose}
    >
      <form onSubmit={onFormSubmit}>
        <ModalBody>
          <div className="flex items-center mb-3">
            <div className="mr-3 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:h-10 sm:w-10">
              <AiOutlineDelete className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Confirm Deletion of this Election
            </h3>
          </div>

          {/* form inputs */}
          <div className="w-full">
            <div className="mb-5">
              <h4 className="text-red-500 font-semibold text-md ">
                Please enter the Election Name below to confirm the deletion.
              </h4>
            </div>

            <div className="my-2">
              <p className="text-sm font-bold text-center">{electionName}</p>
            </div>

            <Input
              id="name"
              name="name"
              placeholder="Enter Election Name"
              className="bg-gray-200 border-gray-200"
              ref={firstInput}
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              required
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <span className="flex w-full sm:ml-3 sm:w-auto">
            <button
              className="btn btn-red w-full py-2 sm:w-32"
              type="submit"
              disabled={
                confirmation.toLowerCase() !== electionName.toLocaleLowerCase() ||
                status === 'pending'
              }
            >
              Delete
            </button>
          </span>
          <span className="mt-3 flex w-full sm:mt-0 sm:w-auto">
            <button
              type="button"
              onClick={onModalClose}
              className="btn btn-white w-full py-2 sm:w-24"
            >
              Cancel
            </button>
          </span>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default ModalDeleteElection
