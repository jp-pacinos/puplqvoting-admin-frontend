import React, { useCallback, useEffect, useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEdit } from 'react-icons/ai'

import { AppDispatch } from 'app/store'
import { Laravel, RequestStatus as RequestStatusProps, Models } from 'api/types'
import { ApiValidationResponse } from 'api/parties'
import { RequestStatus } from 'common/constants'
import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import { FormInputGroup, FormSelectGroup, FormTextAreaGroup } from 'common/components/Form'
import { selectSessionOptions } from 'features/app/appSlice'
import { updateParty } from 'features/parties/partiesSlice'

import { PartyEditProps } from './types'
import initialState from './initialState'

type Validation = Laravel.Validation.UnprocessableEntity<Models.Party.Fillable>
type Status = RequestStatusProps | 'validating'

interface Props extends PartyEditProps {
  useOpenModal: () => [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const EditPartyModal: React.FC<Props> = ({
  party,
  useOpenModal,
  onSuccess = () => {},
  onFail = () => {},
}) => {
  const [state, setState] = useState(initialState)
  const [status, setStatus] = useState<Status>('idle')
  const [validation, setValidation] = useState<Validation>({
    message: '',
    errors: {},
  })

  useEffect(() => {
    setState(party)
  }, [party])

  const [openModal, setOpenModal] = useOpenModal()

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

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setStatus(RequestStatus.pending)

    try {
      const result = await dispatch(updateParty({ id: party.id, changes: state }))
      const response = unwrapResult(result)

      onSuccess(response.party)
      setOpenModal(false)
      setStatus(RequestStatus.success)
    } catch (e) {
      if (e && e.errors) {
        setValidation(e as ApiValidationResponse.updateParty)
        setStatus(RequestStatus.validating)
        return
      }

      setStatus(RequestStatus.failure)
      onFail(e)
    }
  }

  const onModalClose = () => {
    setOpenModal(false)
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

  return (
    <Modal
      name="edit-party-modal"
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
              Updates for {party.name}
            </h3>
          </div>

          {renderValidation}

          {/* form-inputs */}
          <div className="flex flex-wrap items-start -mx-3">
            <div className="w-full px-3">
              <div className="my-5">
                <h4 className="text-blue-500 font-semibold text-md">Party Information</h4>
              </div>

              <FormInputGroup
                id="party"
                name="name"
                label="Party"
                placeholder="Enter Party name"
                className="bg-gray-200 border-gray-200"
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
              Update
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

export default EditPartyModal
