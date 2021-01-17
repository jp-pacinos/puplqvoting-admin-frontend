import React from 'react'
import { FiX } from 'react-icons/fi'

import { Search } from 'common/components'
import { Fade } from 'common/components/Transitions'
import { IconButton, Select } from 'common/components/Core'
import { SelectGender, SelectCourses } from 'features/app/components'

interface Props {}

const Filters: React.FC<Props> = () => {
  let isDirty = true

  return (
    <div className="card py-3">
      <div className="flex flex-wrap md:flex-nowrap items-center">
        <div className="w-full mb-1 md:mb-0 md:w-auto">
          <h2 className="font-medium text-blue-500">Search:</h2>
        </div>

        <div className="w-full px-3 mb-2 md:mb-0 md:w-4/12">
          <Search placeholder="Student number..." />
        </div>

        <div className="w-full -mx-2 md:w-8/12 flex items-center">
          {/*  course */}
          <div className="w-full px-2 md:w-1/3">
            <SelectCourses
              id="course-select"
              name="course"
              placeholder="All Course"
              // value={value.course}
              // onChange={handleOnChange}
              className="leading-tight py-1 bg-gray-100 border-gray-200"
            />
          </div>

          {/*  gender */}
          <div className="w-full px-2 md:w-1/3">
            <SelectGender
              id="gender-select"
              name="gender"
              placeholder="All Gender"
              // value={value.gender}
              // onChange={handleOnChange}
              className="leading-tight py-1 bg-gray-100 border-gray-200"
            />
          </div>

          {/*  voter */}
          <div className="w-full px-2 md:w-1/3">
            <Select
              id="withcode-select"
              name="code"
              placeholder="Both"
              items={[
                { text: 'With Code', value: '1' },
                { text: 'Without Code', value: '2' },
              ]}
              // value={value.voter}
              // onChange={handleOnChange}
              className="leading-tight py-1 bg-gray-100 border-gray-200"
            />
          </div>

          <Fade in={isDirty} className="pr-2 flex items-center w-auto">
            <IconButton
              onClick={() => {}}
              className="hover:bg-red-100 text-red-500 text-2xl"
              title="Reset"
            >
              <FiX />
            </IconButton>
          </Fade>
        </div>
      </div>
    </div>
  )
}

export default Filters
