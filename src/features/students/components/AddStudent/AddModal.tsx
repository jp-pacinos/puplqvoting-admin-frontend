import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineUserAdd } from 'react-icons/ai'

import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import { FormSelectGroup, FormInputGroup } from 'common/components/Form'

import { selectSexOptions, selectVoterOptions, selectSelectCourses } from 'features/app/appSlice'
import { addModalClose, selectAddModal, createStudent } from 'features/students/studentsSlice'

import initialState from './initialState'

const AddModal: React.FC<{}> = () => {
  const { open, status, validation } = useSelector(selectAddModal)
  const dispatch = useDispatch()

  const sexItems = useSelector(selectSexOptions)
  const voterItems = useSelector(selectVoterOptions)
  const courseItems = useSelector(selectSelectCourses)

  // local state
  const [state, setState] = useState(initialState)

  const startInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setState(initialState)
    startInput.current?.focus()
  }, [open])

  const onFormInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
      let input = { [e.currentTarget.name]: e.currentTarget.value }
      setState((prev) => ({ ...prev, ...input }))
    },
    []
  )

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createStudent(state))
  }

  const onModalClose = () => {
    dispatch(addModalClose())
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
    <Modal name="add-modal" position="center" size="4xl" open={open} onClose={onModalClose}>
      <form onSubmit={onFormSubmit}>
        <ModalBody>
          <div className="flex items-center">
            <div className="mr-3 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:h-10 sm:w-10">
              <AiOutlineUserAdd className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Add Student Account
            </h3>
          </div>

          {renderValidation}

          {/* form-inputs */}
          <div className="flex flex-wrap items-start -mx-3">
            <div className="w-full md:w-1/2 px-3">
              <div className="my-5">
                <h4 className="text-blue-500 font-semibold text-md">Student Information</h4>
              </div>

              <FormInputGroup
                id="lastname"
                name="lastname"
                label="Last name"
                placeholder="Enter Last Name"
                className="bg-gray-200 border-gray-200"
                value={state.lastname}
                onChange={onFormInputChange}
                ref={startInput}
                required
              />

              <FormInputGroup
                id="firstname"
                name="firstname"
                label="First name"
                placeholder="Enter First Name"
                className="bg-gray-200 border-gray-200"
                value={state.firstname}
                onChange={onFormInputChange}
                required
              />

              <FormInputGroup
                id="middlename"
                name="middlename"
                label="Middle name"
                placeholder="Enter Middle Name"
                className="bg-gray-200 border-gray-200"
                value={state.middlename ?? ''}
                onChange={onFormInputChange}
              />

              <FormInputGroup
                id="suffix"
                name="suffix"
                label="Suffix"
                placeholder="Enter Suffix"
                className="bg-gray-200 border-gray-200"
                value={state.suffix ?? ''}
                onChange={onFormInputChange}
              />

              <FormSelectGroup
                id="sex"
                name="sex"
                label="Gender"
                items={sexItems}
                value={state.sex}
                onChange={onFormInputChange}
                placeholder="Select gender"
                className="bg-gray-200 border-gray-200"
                required
              />

              <FormInputGroup
                id="date"
                type="date"
                name="birthdate"
                label="Birthdate"
                placeholder="Enter Birthday"
                value={state.birthdate}
                onChange={onFormInputChange}
                className="bg-gray-200 border-gray-200"
                required
              />

              <FormSelectGroup
                id="course"
                label="Course"
                name="course_id"
                items={courseItems}
                placeholder="Select Course"
                className="bg-gray-200 border-gray-200"
                value={state.course_id}
                onChange={onFormInputChange}
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <div className="my-5">
                <h4 className="text-blue-500 font-semibold text-md">Student Account</h4>
              </div>

              <FormInputGroup
                id="studentnumber"
                name="student_number"
                label="Student Number"
                placeholder="Enter Student Number"
                className="bg-gray-200 border-gray-200"
                value={state.student_number}
                onChange={onFormInputChange}
                required
              />

              <FormSelectGroup
                id="canvote"
                name="can_vote"
                label="Voter Status"
                items={voterItems}
                className="bg-gray-200 border-gray-200"
                value={state.can_vote}
                onChange={onFormInputChange}
                placeholder="Voter Status"
                required
              />

              <FormInputGroup
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="user@example.com"
                className="bg-gray-200 border-gray-200"
                value={state.email ?? ''}
                onChange={onFormInputChange}
                required
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
              Confirm
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

export default AddModal
