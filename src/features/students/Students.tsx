import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdFilterList } from 'react-icons/md'

import { Search } from 'common/components'
import { IconButton } from 'common/components/Core'
import { Fade } from 'common/components/Transitions'
import { StudentsTable, Filters, GroupActionButtons, AddStudent } from './components'
import { FilterProps } from './types'

interface Props {
  usePage: () => [number, Dispatch<SetStateAction<number>>]
  usePerPage: () => [number, Dispatch<SetStateAction<number>>]
  useSearch: () => [[string, string], Dispatch<SetStateAction<string>>]
  useFilters: () => [FilterProps, Dispatch<SetStateAction<FilterProps>>]
}

const Students: React.FC<Props> = ({ usePage, usePerPage, useSearch, useFilters }) => {
  const [page, setPage] = usePage()
  const [perPage, setPerPage] = usePerPage()
  const [[search], setSearch] = useSearch()
  const [filters, setFilters] = useFilters()

  const [openFilters, setOpenFilters] = useState<boolean>(
    Boolean(JSON.parse(localStorage.getItem('students-filter') || '1'))
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(() => 1)
    setSearch(() => e.target.value)
  }

  const handleFilterChange = (newFilters: FilterProps) => {
    setPage(() => 1)
    setFilters(() => newFilters)
  }

  const FilterButton = useMemo(
    () => (
      <IconButton
        onClick={() =>
          setOpenFilters((prev) => {
            localStorage.setItem('students-filter', JSON.stringify(!prev))
            return !prev
          })
        }
        className={`${
          openFilters
            ? 'bg-blue-500 text-white hover:bg-blue-400'
            : 'bg-gray-200 text-gray-700 hover:bg-blue-500  hover:text-white'
        } text-2xl`}
      >
        <MdFilterList />
      </IconButton>
    ),
    [openFilters]
  )

  return (
    <>
      <div className="flex justify-between items-center my-3 md:my-5">
        <div className="flex-grow flex items-center">
          <div className="md:w-7/12 lg:w-5/12 mr-3">
            <Search value={search} onChange={handleSearch} placeholder="Search student number..." />
          </div>
          <div>{FilterButton}</div>
        </div>

        <div className="ml-3">
          <ButtonCourses />
          <AddStudent />
        </div>
      </div>

      <Fade in={openFilters}>
        <div className="mb-3">
          <Filters value={filters} onChange={handleFilterChange} />
        </div>
      </Fade>

      <Fade>
        <div className="card mb-3">
          <StudentsTable {...{ page, perPage, setPage, setPerPage }} />
        </div>
      </Fade>

      {/* group updates - UPDATE | DELETE | CANCEL */}
      <GroupActionButtons />
    </>
  )
}

export default Students

//

const ButtonCourses: React.FC = React.memo(() => {
  return (
    <Link to="/courses">
      <button className="btn btn-green btn-lg font-semibold mr-2">Courses</button>
    </Link>
  )
})
