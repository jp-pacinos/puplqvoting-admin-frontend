import React, { Dispatch, SetStateAction } from 'react'

import { Search } from 'common/components'
import { Fade } from 'common/components/Transitions'
import usePageBack from 'common/hooks/usePageBack'

import { CoursesTable, ModalDeleteCourse } from './components'

interface Props {
  useSearch: () => [string, Dispatch<SetStateAction<string>>]
}

const Courses: React.FC<Props> = ({ useSearch }) => {
  const [search, setSearch] = useSearch()

  const goBack = usePageBack()

  return (
    <>
      <div className="flex justify-between items-center my-3 md:my-5">
        <div className="flex-grow">
          <div className="md:w-7/12 lg:w-5/12">
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search course..."
            />
          </div>
        </div>

        <div className="ml-3 flex items-center">
          <button onClick={goBack} className="btn btn-green btn-lg font-semibold mr-2">
            Students
          </button>
          <button className="btn btn-blue btn-lg font-semibold">+ New Course</button>
        </div>
      </div>

      <Fade delay={175} className="card">
        <h4 className="text-blue-600 font-medium leading-loose mb-3">Course Lists</h4>

        <CoursesTable />
      </Fade>

      <ModalDeleteCourse />
    </>
  )
}

export default Courses

//
