import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlinePlus } from 'react-icons/ai'

import { addElection, ApiValidationResponse } from 'api/elections'
import { RequestStatus } from 'common/constants'
import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import { FormInputGroup, FormSelectGroup, FormTextAreaGroup } from 'common/components/Form'
import { selectVerificationTypeOptions, selectYesNoOptions } from 'features/app/appSlice'

import { AllowedFillable, Status, Validation, ModalAddElectionProps } from './types'
import initialState from './initialState'

interface Props extends ModalAddElectionProps {
  useOpenModal: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const ModalAddElection: React.FC<Props> = ({
  useOpenModal,
  onSuccess = () => {},
  onFail = () => {},
}) => {
  const [openModal, setOpenModal] = useOpenModal
  const [status, setStatus] = useState<Status>('idle')
  const [validation, setValidation] = useState<Validation>({
    message: '',
    errors: {},
  })

  const verificationOptions = useSelector(selectVerificationTypeOptions)
  const yesNoOptions = useSelector(selectYesNoOptions)

  const [state, setState] = useState<AllowedFillable>(initialState)

  const firstInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (openModal) {
      firstInput.current?.focus()
      return
    }
    setState(() => initialState)
  }, [openModal])

  const onModalClose = useCallback(() => {
    setOpenModal(false)
  }, [setOpenModal])

  const onInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      let input = { [e.currentTarget.name]: e.currentTarget.value }
      setState((prev) => ({ ...prev, ...input }))
    },
    []
  )

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setValidation({ message: '', errors: {} })
    setStatus(RequestStatus.pending)

    try {
      const response = await addElection({ data: state })

      onSuccess(response.data.session)
      setOpenModal(false)
      setStatus(RequestStatus.success)
    } catch (e) {
      if (e.response && e.response.status === 422) {
        setValidation(e.response.data as ApiValidationResponse.addElection)
        setStatus(RequestStatus.validating)
        return
      }

      setStatus(RequestStatus.failure)
      onFail(e)
    }
  }

  const renderValidation = status === 'validating' && (
    <div className="mt-5">
      {Object.entries(validation.errors).map(([key, errors]) => {
        if (!errors) return undefined

        return errors.map((requirements, i) => {
          return (
            <p key={`${key}-${i}`} className="text-red-500 font-semibold text-md">
              * {requirements}
            </p>
          )
        })
      })}
    </div>
  )

  return (
    <Modal
      name="create-election-modal"
      position="center"
      size="2xl"
      open={openModal}
      onClose={onModalClose}
    >
      <form onSubmit={onFormSubmit}>
        <ModalBody>
          <div className="flex items-center">
            <div className="mr-3 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:h-10 sm:w-10">
              <AiOutlinePlus className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              New Election
            </h3>
          </div>

          {renderValidation}

          {/* form-inputs */}
          <div className="flex flex-wrap items-start -mx-3">
            <div className="w-full px-3">
              <div className="my-5">
                <h4 className="text-blue-500 font-semibold text-md">Enter Election Information</h4>
              </div>

              <FormInputGroup
                id="name"
                name="name"
                label="Election"
                placeholder="Enter Election name"
                className="bg-gray-200 border-gray-200"
                ref={firstInput}
                value={state.name}
                onChange={onInputChange}
                required
              />

              <FormInputGroup
                id="year"
                type="number"
                min="1"
                max="9999"
                name="year"
                label="Year"
                placeholder="Enter Year"
                className="bg-gray-200 border-gray-200"
                value={state.year}
                onChange={onInputChange}
                required
              />

              <FormSelectGroup
                items={yesNoOptions}
                id="registration"
                name="registration"
                label="Allow registration"
                placeholder="Select Registration"
                className="bg-gray-200 border-gray-200"
                value={state.registration}
                onChange={onInputChange}
                required
              />

              <FormSelectGroup
                items={verificationOptions}
                id="verification_type"
                name="verification_type"
                label="Validate votes via:"
                placeholder="Select Validation Type"
                className="bg-gray-200 border-gray-200"
                value={state.verification_type}
                onChange={onInputChange}
                required
              />

              <FormTextAreaGroup
                id="description"
                name="description"
                label="Description"
                placeholder="Enter Description"
                className="bg-gray-200 border-gray-200"
                value={state.description ?? ''}
                rows={5}
                onChange={onInputChange}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <span className="flex w-full sm:ml-3 sm:w-auto">
            <button
              className="btn btn-blue w-full py-2 sm:w-32"
              type="submit"
              disabled={status === 'pending'}
            >
              Create
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

export default ModalAddElection
