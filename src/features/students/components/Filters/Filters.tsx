import React from 'react'
import { FiX } from 'react-icons/fi'

import { IconButton } from 'common/components/Core'
import { Fade } from 'common/components/Transitions'
import { SelectGender, SelectVoter, SelectCourses } from 'features/app/components'
import { FilterProps } from 'features/students'

interface Props {
  value: FilterProps
  onChange: (newValue: FilterProps) => void
}

const Filters: React.FC<Props> = ({ value, onChange }) => {
  const handleOnChange = (e: React.FormEvent<HTMLSelectElement>) => {
    onChange({ ...value, [e.currentTarget.name]: e.currentTarget.value })
  }

  const handleOnReset = () => {
    onChange({
      course: '',
      year: '',
      gender: '',
      voter: '',
    })
  }

  const isDirty: boolean = Object.entries(value).some((i) => i[1])

  return (
    <div className="card py-3">
      <div className="flex flex-wrap items-center">
        <h2 className="font-medium text-blue-500 mr-5 mb-2 md:mb-0">Filters:</h2>

        <div className="flex items-center w-full md:w-6/12">
          {/*  course */}
          <div className="w-full mr-3">
            <SelectCourses
              id="course-select"
              name="course"
              placeholder="All Course"
              value={value.course}
              onChange={handleOnChange}
              className="leading-tight py-1 bg-gray-100 border-gray-200"
            />
          </div>

          {/*  gender */}
          <div className="w-full mr-3">
            <SelectGender
              id="gender-select"
              name="gender"
              placeholder="All Gender"
              value={value.gender}
              onChange={handleOnChange}
              className="leading-tight py-1 bg-gray-100 border-gray-200"
            />
          </div>

          {/*  voter */}
          <div className="w-full mr-3">
            <SelectVoter
              id="voter-select"
              name="voter"
              placeholder="All Voter"
              value={value.voter}
              onChange={handleOnChange}
              className="leading-tight py-1 bg-gray-100 border-gray-200"
            />
          </div>
        </div>

        <Fade in={isDirty} className="flex items-center">
          <IconButton onClick={handleOnReset} className="hover:bg-red-100 text-red-500 text-2xl">
            <FiX />
          </IconButton>
        </Fade>
      </div>
    </div>
  )
}

export default React.memo(Filters)
