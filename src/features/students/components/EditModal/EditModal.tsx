import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineEdit } from 'react-icons/ai'

import { RootState } from 'app/store'
import { Student as StudentModel } from 'api/types/Models'
import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import { FormSelectGroup, FormInputGroup } from 'common/components/Form'

import { selectSexOptions, selectVoterOptions, selectSelectCourses } from 'features/app/appSlice'
import {
  selectStudentById,
  selectEditModal,
  editModalClose,
  updateStudent,
} from 'features/students/studentsSlice'

import initialData from './initialData'

const EditModal: React.FC<{}> = () => {
  const { open, studentId, status, validation } = useSelector(selectEditModal)
  const student = useSelector((state: RootState) => selectStudentById(state, studentId))
  const dispatch = useDispatch()

  const sexItems = useSelector(selectSexOptions)
  const voterItems = useSelector(selectVoterOptions)
  const courseItems = useSelector(selectSelectCourses)

  // local state
  const [state, setState] = useState(initialData)

  // set the local state
  useEffect(() => {
    if (!student) return

    setState(student)
  }, [student])

  const onFormInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
      let input = { [e.currentTarget.name]: e.currentTarget.value }
      setState((prev) => ({ ...prev, ...input }))
    },
    []
  )

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const changes = {
      ...student,
      ...state,
    } as StudentModel.Fillable

    dispatch(updateStudent({ studentId: studentId as number, changes }))
  }

  const onModalClose = () => {
    dispatch(editModalClose())
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
    <Modal name="edit-modal" position="center" size="4xl" open={open} onClose={onModalClose}>
      <form onSubmit={onFormSubmit}>
        <ModalBody>
          <div className="flex items-center">
            <div className="mr-3 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:h-10 sm:w-10">
              <EditIcon />
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Updates for Account {student ? student.student_number : ''}
              {student && student.official_id && (
                <span className="ml-2 tracking-wide bg-green-100 text-green-500 font-semibold text-sm px-2 py-0 rounded-full text-left">
                  officer
                </span>
              )}
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
                className="bg-gray-200 border-gray-200"
                value={state.sex ?? ''}
                onChange={onFormInputChange}
                placeholder="Select gender"
                required
              />

              <FormInputGroup
                id="date"
                type="date"
                name="birthdate"
                label="Birthdate"
                placeholder="Enter Birthday"
                className="bg-gray-200 border-gray-200"
                value={state.birthdate ?? ''}
                onChange={onFormInputChange}
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

              <div className="my-5">
                <h4 className="text-blue-500 font-semibold text-md">Other Information</h4>
              </div>

              <p className="text-gray-500  text">Created: {state.created_at ?? 'unknown'}</p>
              <p className="text-gray-500  text">Updated: {state.updated_at ?? 'unknown'}</p>
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

export default EditModal

//

const EditIcon = React.memo(() => <AiOutlineEdit className="h-6 w-6 text-blue-600" />)
