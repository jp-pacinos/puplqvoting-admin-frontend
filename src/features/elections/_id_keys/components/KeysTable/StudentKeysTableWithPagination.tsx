import React, { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'

import { Pagination } from 'common/components'
import StudentKeysTable from './StudentKeysTable'

interface Props {
  usePage: () => [number, Dispatch<SetStateAction<number>>]
  usePerPage: () => [number, Dispatch<SetStateAction<number>>]
}

const StudentKeysTableWithPagination: React.FC<Props> = ({ usePage, usePerPage }) => {
  const [page, setPage] = usePage()
  const [perPage, setPerPage] = usePerPage()

  const from = useSelector((state) => state.election.electionKeysPage.pagination.from)
  const to = useSelector((state) => state.election.electionKeysPage.pagination.to)
  const total = useSelector((state) => state.election.electionKeysPage.pagination.total)

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handlePerPageChange = (perPage: number) => {
    setPage(1)
    setPerPage(perPage)
  }

  return (
    <>
      <StudentKeysTable />

      <div className="mt-5">
        <Pagination
          from={from}
          to={to}
          total={total}
          page={page}
          perPage={perPage}
          showPerPage={total > 10}
          onChangePage={handlePageChange}
          onChangePerPage={handlePerPageChange}
        />
      </div>
    </>
  )
}

export default StudentKeysTableWithPagination
