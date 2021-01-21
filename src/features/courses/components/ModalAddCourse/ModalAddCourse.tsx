import React, { useCallback, useEffect, useRef, useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineEdit } from 'react-icons/ai'

import { Course } from 'api/types/Models'
import { AppDispatch } from 'app/store'
import { courseAdded } from 'features/app/appSlice'
import { RequestStatus } from 'common/constants'
import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import { FormInputGroup } from 'common/components/Form'
import { selectAddModal, addModalClose, addCourse } from 'features/courses'

const initialState: Course.Fillable = {
  name: '',
  acronym: '',
}

interface Props {}

const ModalAddCourse: React.FC<Props> = () => {
  const { open: openModal, status, validation } = useSelector(selectAddModal)
  const [course, setCourse] = useState(initialState)

  const dispatch = useDispatch<AppDispatch>()

  const firstInput = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (openModal) {
      firstInput.current?.focus()
      setCourse(initialState)
      return
    }
  }, [openModal])

  const onFormInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.name === 'acronym' ? e.target.value.toUpperCase() : e.target.value
    let input = { [e.target.name]: value }
    setCourse((prev) => ({ ...prev, ...input }))
  }, [])

  const onModalClose = () => {
    dispatch(addModalClose())
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(addCourse({ data: course })).then((res) => {
      let data = unwrapResult(res)
      dispatch(courseAdded(data.course))
    })
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
      name="create-course-modal"
      position="center"
      size="lg"
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
              New Course
            </h3>
          </div>

          {renderValidation}

          {/* form-inputs */}
          <div className="flex flex-wrap items-start -mx-3">
            <div className="w-full px-3">
              <div className="my-5">
                <h4 className="text-blue-500 font-semibold text-md">Enter Course Information</h4>
              </div>

              <FormInputGroup
                id="course"
                name="name"
                label="Course"
                placeholder="Enter Course name"
                className="bg-gray-200 border-gray-200"
                ref={firstInput}
                value={course.name}
                onChange={onFormInputChange}
                required
              />

              <FormInputGroup
                id="acronym"
                name="acronym"
                label="Acronym"
                placeholder="Enter acronym"
                className="bg-gray-200 border-gray-200"
                value={course.acronym}
                onChange={onFormInputChange}
                maxLength={7}
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

export default ModalAddCourse
