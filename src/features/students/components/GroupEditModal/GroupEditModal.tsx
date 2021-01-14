import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineEdit, AiOutlineWarning } from 'react-icons/ai'

import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import { FormSelectGroup } from 'common/components/Form'

import { selectSexOptions, selectVoterOptions, selectSelectCourses } from 'features/app/appSlice'
import {
  selectGroupEditModal,
  groupEditModalClose,
  groupUpdateStudents,
} from 'features/students/studentsSlice'

import initialState from './initialData'

const GroupEditModal: React.FC<{}> = () => {
  const { open, studentIds, status } = useSelector(selectGroupEditModal)
  const dispatch = useDispatch()

  const sexItems = useSelector(selectSexOptions)
  const voterItems = useSelector(selectVoterOptions)
  const courseItems = useSelector(selectSelectCourses)

  // local state
  const [state, setState] = useState(initialState)

  const onFormInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
      let input = { [e.currentTarget.name]: e.currentTarget.value }
      setState((prev) => ({ ...prev, ...input }))
    },
    []
  )

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      groupUpdateStudents({
        ...state,
        studentIds,
      })
    )
  }

  const onModalClose = () => {
    dispatch(groupEditModalClose())
  }

  useEffect(() => {
    if (!open) setState(initialState)
  }, [open])

  return (
    <Modal name="group-edit-modal" position="center" size="lg" open={open} onClose={onModalClose}>
      <form onSubmit={onFormSubmit}>
        <ModalBody>
          <div className="flex items-center">
            <div className="mr-3 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:h-10 sm:w-10">
              <EditIcon />
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Updates for Student Accounts
            </h3>
          </div>

          <div className="bg-yellow-200 p-2 px-3 mt-3 rounded">
            <p className="text-sm flex items-center text-gray-700">
              <WarningIcon />
              Please check all the fields before updating records!
            </p>
          </div>

          {/* form-inputs */}
          <div className="flex flex-wrap items-start -mx-3">
            <div className="w-full px-3">
              <div className="my-5">
                <h4 className="text-blue-500 font-semibold text-md">Student Account</h4>
              </div>

              <FormSelectGroup
                id="canvote"
                name="can_vote"
                label="Voter Status"
                items={voterItems}
                value={state.can_vote}
                onChange={onFormInputChange}
                placeholder="Keep Voter Status"
              />
            </div>

            <div className="w-full px-3">
              <div className="my-5">
                <h4 className="text-blue-500 font-semibold text-md">Student Information</h4>
              </div>

              <FormSelectGroup
                id="sex"
                name="sex"
                label="Gender"
                items={sexItems}
                value={state.sex}
                onChange={onFormInputChange}
                placeholder="Keep Gender"
              />

              <FormSelectGroup
                id="course"
                label="Cource"
                name="course_id"
                items={courseItems}
                value={state.course_id}
                onChange={onFormInputChange}
                placeholder="Keep Course"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <span className="flex w-full sm:ml-3 sm:w-auto">
            <button
              className="btn btn-blue w-full py-2"
              type="submit"
              disabled={status === 'pending'}
            >
              {status === 'pending' ? 'Please wait...' : `Update (${studentIds.length}) selected`}
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

export default GroupEditModal

//

const EditIcon = React.memo(() => <AiOutlineEdit className="h-6 w-6 text-blue-600" />)
const WarningIcon = React.memo(() => <AiOutlineWarning className="inline mr-1" />)
