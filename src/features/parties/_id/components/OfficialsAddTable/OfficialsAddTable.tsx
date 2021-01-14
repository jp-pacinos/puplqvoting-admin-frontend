import React from 'react'
import { useSelector } from 'react-redux'

import { Pagination as BasePagination } from 'common/components'
import { selectStudentIds, selectSearchStatus, selectSearchPagination } from 'features/parties/_id'
import { StudentTableRow } from './components'

interface Props {
  usePage: () => [number, React.Dispatch<React.SetStateAction<number>>]
}

const OfficialAddTable: React.FC<Props> = ({ usePage }) => {
  return (
    <>
      <div className="my-3"></div>

      <div className="overflow-x-auto">
        <table
          className="table officials-table-search stripped bg-white border-gray-800"
          style={{ minWidth: 750, minHeight: 130 }}
        >
          <thead className="bg-gray-50 border-2 border-gray-200">
            <tr>
              <th className="w-24 text-center">
                <p className="text-center">#</p>
              </th>
              <th className="w-3/12">Student No.</th>
              <th className="w-4/12 ">
                Fullname <span className="text-gray-500 text-xs font-semibold">LN/FN/MI</span>
              </th>
              <th className="w-2/12">Sex</th>
              <th className="w-2/12">Course</th>
            </tr>
          </thead>
          <tbody>
            <StudentTableRowWithStatus />
          </tbody>
        </table>

        <div className="mt-3">
          <Pagination usePage={usePage} />
        </div>
      </div>
    </>
  )
}

export default OfficialAddTable

//

const StudentTableRowWithStatus: React.FC<{}> = () => {
  const ids = useSelector(selectStudentIds)
  const status = useSelector(selectSearchStatus)

  if (status === 'pending') {
    return (
      <tr>
        <td colSpan={5} className="font-semibold text-gray-600">
          Loading...
        </td>
      </tr>
    )
  }

  if (status === 'success') {
    return (
      <>
        {ids.length > 0 ? (
          ids.map((id) => <StudentTableRow key={id} id={id} />)
        ) : (
          <tr>
            <td colSpan={5} className="font-semibold text-gray-600">
              No records found.
            </td>
          </tr>
        )}
      </>
    )
  }

  if (status === 'failure') {
    return (
      <tr>
        <td colSpan={5} className="font-semibold text-gray-600">
          There was an error fetching results.
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td colSpan={5} className="font-semibold text-gray-600">
        {/* Please wait... */}
        Fill the information above to begin the search.
      </td>
    </tr>
  )
}

interface PaginationProps {
  usePage: () => [number, React.Dispatch<React.SetStateAction<number>>]
}

const Pagination: React.FC<PaginationProps> = ({ usePage }) => {
  const pagination = useSelector(selectSearchPagination)

  const [page, setPage] = usePage()

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <BasePagination
      page={page}
      to={pagination.to}
      total={pagination.total}
      from={pagination.from}
      perPage={pagination.per_page}
      onChangePage={handlePageChange}
      showPerPage={false}
    />
  )
}
