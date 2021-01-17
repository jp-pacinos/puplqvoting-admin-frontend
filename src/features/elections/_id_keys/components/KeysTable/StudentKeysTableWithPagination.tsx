import React from 'react'

import { Pagination } from 'common/components'
import StudentKeysTable from './StudentKeysTable'

interface Props {}

const StudentKeysTableWithPagination: React.FC<Props> = () => {
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

  return (
    <>
      <StudentKeysTable />

      <div className="mt-5">{renderPagination}</div>
    </>
  )
}

export default StudentKeysTableWithPagination
