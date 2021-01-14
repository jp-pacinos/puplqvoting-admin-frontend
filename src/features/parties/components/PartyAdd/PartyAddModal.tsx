import React, { useCallback, useEffect, useRef, useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineEdit } from 'react-icons/ai'

import { AppDispatch } from 'app/store'
import { ApiValidationResponse } from 'api/parties'
import { RequestStatus } from 'common/constants'
import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import { FormInputGroup, FormSelectGroup, FormTextAreaGroup } from 'common/components/Form'
import { selectSessionOptions } from 'features/app/appSlice'

import { addParty } from 'features/parties/partiesSlice'
import { PartyAddProps, Validation, Status } from './types'
import initialState from './initialState'

interface Props extends PartyAddProps {
  useOpenModal: () => [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const PartyAddModal: React.FC<Props> = ({
  useOpenModal,
  onSuccess = () => {},
  onFail = () => {},
}) => {
  const [openModal, setOpenModal] = useOpenModal()
  const [status, setStatus] = useState<Status>('idle')
  const [validation, setValidation] = useState<Validation>({
    message: '',
    errors: {},
  })

  const [state, setState] = useState(initialState)

  // select options
  const sessionItems = useSelector(selectSessionOptions)

  const dispatch = useDispatch<AppDispatch>()

  const onFormInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      let input = { [e.currentTarget.name]: e.currentTarget.value }
      setState((prev) => ({ ...prev, ...input }))
    },
    []
  )

  const onModalClose = () => {
    setOpenModal(false)
  }

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setStatus(RequestStatus.pending)

    try {
      const result = await dispatch(addParty({ party: state }))
      const response = unwrapResult(result)

      onSuccess(response.party)
      setOpenModal(false)
      setStatus(RequestStatus.success)
    } catch (e) {
      if (e && e.errors) {
        setValidation(e as ApiValidationResponse.addParty)
        setStatus(RequestStatus.validating)
        return
      }

      setStatus(RequestStatus.failure)
      onFail(e)
    }
  }

  const renderValidation = status === RequestStatus.validating && (
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

  const firstInput = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (openModal) {
      firstInput.current?.focus()
      return
    }
    setState(initialState)
  }, [openModal])

  return (
    <Modal
      name="create-party-modal"
      position="center"
      size="2xl"
      open={openModal}
      onClose={onModalClose}
    >
      <form onSubmit={onFormSubmit}>
        <ModalBody>
          <div className="flex items-center">
            <div className="mr-3 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:h-10 sm:w-10">
              <AiOutlineEdit className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              New Party
            </h3>
          </div>

          {renderValidation}

          {/* form-inputs */}
          <div className="flex flex-wrap items-start -mx-3">
            <div className="w-full px-3">
              <div className="my-5">
                <h4 className="text-blue-500 font-semibold text-md">Enter Party Information</h4>
              </div>

              <FormInputGroup
                id="party"
                name="name"
                label="Party"
                placeholder="Enter Party name"
                className="bg-gray-200 border-gray-200"
                ref={firstInput}
                value={state.name}
                onChange={onFormInputChange}
                required
              />

              <FormSelectGroup
                id="election"
                name="session_id"
                label="Election"
                items={sessionItems}
                className="bg-gray-200 border-gray-200"
                value={state.session_id}
                onChange={onFormInputChange}
                placeholder="Select Election"
                required
              />

              <FormTextAreaGroup
                id="description"
                name="description"
                label="Party Description"
                placeholder="Enter Description"
                className="bg-gray-200 border-gray-200"
                value={state.description ?? ''}
                rows={5}
                onChange={onFormInputChange}
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

export default PartyAddModal
