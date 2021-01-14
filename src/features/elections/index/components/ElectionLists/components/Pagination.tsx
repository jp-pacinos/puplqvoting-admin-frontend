import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { selectPagination } from 'features/elections/index/slice'
import { Pagination as BasePagination } from 'common/components'

interface Props {
  usePage: [number, React.Dispatch<React.SetStateAction<number>>]
}

const Pagination: React.FC<Props> = ({ usePage }) => {
  const [page, setPage] = usePage
  const pagination = useSelector(selectPagination)

  useEffect(() => {
    if (pagination.currentPage !== 0) {
      setPage(pagination.currentPage)
    }
  }, [pagination.currentPage, setPage])

  return (
    <BasePagination
      onChangePage={(page) => setPage(page)}
      page={page}
      from={pagination.from}
      to={pagination.to}
      perPage={pagination.perPage}
      total={pagination.total}
      showPerPage={false}
    />
  )
}

export default Pagination
