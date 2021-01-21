import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'

import { Search } from 'common/components'
import { Fade } from 'common/components/Transitions'
import { addModalOpen } from 'features/courses'
import usePageBack from 'common/hooks/usePageBack'

import { CoursesTable, ModalAddCourse, ModalDeleteCourse } from './components'

interface Props {
  useSearch: () => [string, Dispatch<SetStateAction<string>>]
}

const Courses: React.FC<Props> = ({ useSearch }) => {
  const [search, setSearch] = useSearch()

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
          <ButtonGotoStudents />
          <ButtonAddCourse />
        </div>
      </div>

      <Fade delay={175} className="card">
        <h4 className="text-blue-600 font-medium leading-loose mb-3">Course Lists</h4>

        <CoursesTable />
      </Fade>

      <ModalAddCourse />
      <ModalDeleteCourse />
    </>
  )
}

export default Courses

//

const ButtonGotoStudents: React.FC = () => {
  const goBack = usePageBack()

  return (
    <button onClick={goBack} className="btn btn-green btn-lg font-semibold mr-2">
      Students
    </button>
  )
}

const ButtonAddCourse: React.FC = () => {
  const dispatch = useDispatch()

  return (
    <button onClick={() => dispatch(addModalOpen())} className="btn btn-blue btn-lg font-semibold">
      + New Course
    </button>
  )
}
