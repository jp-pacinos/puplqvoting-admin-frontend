import React from 'react'
import { useSelector } from 'react-redux'

import Pagination from 'common/components/Pagination'
import { selectPagination, selectStudentsTotal } from 'features/students/studentsSlice'

import StudentsTable from './StudentsTable'

interface Props {
  page: number
  perPage: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setPerPage: React.Dispatch<React.SetStateAction<number>>
}

const StudentsTableWithPagination: React.FC<Props> = ({ page, perPage, setPage, setPerPage }) => {
  const pagination = useSelector(selectPagination)
  const studentsCount = useSelector(selectStudentsTotal)

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handlePerPageChange = (perPage: number) => {
    setPage(1)
    setPerPage(perPage)
  }

  const renderPagination = pagination.total > 0 && (
    <Pagination
      from={pagination.from}
      to={pagination.to}
      total={pagination.total}
      page={page}
      perPage={perPage}
      onChangePage={handlePageChange}
      onChangePerPage={handlePerPageChange}
    />
  )

  return (
    <>
      {renderPagination && <div className="mb-5">{renderPagination}</div>}

      <StudentsTable />

      {studentsCount > 10 && <div className="mt-5">{renderPagination}</div>}
    </>
  )
}

export default React.memo(StudentsTableWithPagination)
