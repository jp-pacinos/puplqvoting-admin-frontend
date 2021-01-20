import React from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { HiOutlineTrash } from 'react-icons/hi'

import { AppDispatch } from 'app/store'
import { Modal, ModalBody, ModalFooter } from 'common/components/Modal'
import { courseDeleted } from 'features/app/appSlice'
import {
  selectDeleteModal,
  selectCourseById,
  deleteModalClose,
  deleteCourse,
} from 'features/courses'

interface Props {}

const ModalDeleteCourse: React.FC<Props> = () => {
  const { open, courseId } = useSelector(selectDeleteModal)
  const course = useSelector((state) => selectCourseById(state, courseId))!

  const dispatch = useDispatch<AppDispatch>()

  const onModalClose = () => {
    dispatch(deleteModalClose())
  }

  const onClickDelete = async () => {
    dispatch(deleteModalClose())
    try {
      let response = await dispatch(deleteCourse({ id: courseId as number }))
      unwrapResult(response)
      dispatch(courseDeleted({ id: courseId })) // update app selects
    } catch (e) {
      // console.log('catch', e)
    }
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
                It will delete course {course ? course.name : ''}.{' '}
                {course ? `(${course.acronym})` : ''}
              </p>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <span className="flex w-full sm:ml-3 sm:w-auto">
          <button onClick={onClickDelete} type="button" className="btn btn-red w-full py-2">
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

export default React.memo(ModalDeleteCourse)
