import React, { useCallback, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Input, Select } from 'common/components/Core'
import { selectSelectCourses } from 'features/app/appSlice'
import { StudentFilters } from './../types'

interface Props {
  useFilters: () => [
    [StudentFilters, StudentFilters],
    React.Dispatch<React.SetStateAction<StudentFilters>>
  ]
}

const SearchFilters: React.FC<Props> = ({ useFilters }) => {
  const [[state], setState] = useFilters()

  const courseItems = useSelector(selectSelectCourses)

  const onFormInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
      let input = { [e.currentTarget.name]: e.currentTarget.value }
      setState((prev) => ({ ...prev, ...input }))
    },
    [setState]
  )

  const firstInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    firstInput.current?.focus()
  }, [])

  return (
    <div className="w-full flex-grow lg:w-3/4">
      <div className="flex flex-wrap items-center md:justify-evenly -mx-1">
        <div className="w-full md:w-1/5 mb-2 md:mb-0 px-1">
          <Input
            ref={firstInput}
            onChange={onFormInputChange}
            value={state.student_number}
            id="studentnumber"
            name="student_number"
            placeholder="Student number"
            className="py-1 bg-gray-100 border-gray-100"
          />
        </div>
        <div className="w-full md:w-1/5 mb-2 md:mb-0 px-1">
          <Input
            onChange={onFormInputChange}
            value={state.lastname}
            id="lastname"
            name="lastname"
            placeholder="Last name"
            className="py-1 bg-gray-100 border-gray-100"
          />
        </div>
        <div className="w-full md:w-1/5 mb-2 md:mb-0 px-1">
          <Input
            onChange={onFormInputChange}
            value={state.firstname}
            id="firstname"
            name="firstname"
            placeholder="First name"
            className="py-1 bg-gray-100 border-gray-100"
          />
        </div>
        <div className="w-full md:w-1/5 mb-2 md:mb-0 px-1">
          <Input
            onChange={onFormInputChange}
            value={state.middlename}
            id="middlename"
            name="middlename"
            placeholder="Middle name"
            className="py-1 bg-gray-100 border-gray-100"
          />
        </div>
        <div className="w-full md:w-1/5 mb-2 md:mb-0 px-1">
          <Select
            id="course"
            name="course_id"
            items={courseItems}
            placeholder="Course"
            className="py-1 bg-gray-100 border-gray-100"
            value={state.course_id}
            onChange={onFormInputChange}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchFilters
