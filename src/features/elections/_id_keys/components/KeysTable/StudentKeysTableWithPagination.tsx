import React, { Dispatch, SetStateAction } from 'react'

import { Pagination } from 'common/components'
import StudentKeysTable from './StudentKeysTable'

interface Props {
  usePage: () => [number, Dispatch<SetStateAction<number>>]
  usePerPage: () => [number, Dispatch<SetStateAction<number>>]
}

const StudentKeysTableWithPagination: React.FC<Props> = ({ usePage, usePerPage }) => {
  const renderPagination = (
    <Pagination
      from={0}
      to={4}
      total={100}
      page={1}
      perPage={10}
      onChangePage={() => {}}
      onChangePerPage={() => {}}
    />
  )

  // const pagination = useSelector(selectPagination)
  // const studentsCount = useSelector(selectStudentsTotal)

  // const handlePageChange = (page: number) => {
  //   setPage(page)
  // }

  // const handlePerPageChange = (perPage: number) => {
  //   setPage(1)
  //   setPerPage(perPage)
  // }

  // const renderPagination = pagination.total > 0 && (
  //   <Pagination
  //     from={pagination.from}
  //     to={pagination.to}
  //     total={pagination.total}
  //     page={page}
  //     perPage={perPage}
  //     onChangePage={handlePageChange}
  //     onChangePerPage={handlePerPageChange}
  //   />
  // )

  return (
    <>
      <StudentKeysTable />

      <div className="mt-5">{renderPagination}</div>
    </>
  )
}

export default StudentKeysTableWithPagination
