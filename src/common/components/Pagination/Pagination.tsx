import React, { useMemo } from 'react'
import Select from 'common/components/Core/Select'

const perPageSelect = [
  { text: '10', value: '10' },
  { text: '30', value: '30' },
  { text: '50', value: '50' },
  { text: '100', value: '100' },
  { text: '300', value: '300' },
  { text: '500', value: '500' },
]

interface Props {
  from: number
  to: number
  total: number
  page: number
  perPage: number
  onChangePage: (page: number) => void
  onChangePerPage?: (perPage: number) => void
  showPerPage?: boolean
}

const Pagination: React.FC<Props> = ({
  from,
  to,
  total,
  page = 1,
  perPage = 10,
  onChangePage,
  onChangePerPage = () => {},
  showPerPage = true,
}) => {
  let totalPage = Math.ceil(total / perPage)
  let firstPage = page <= 1 ? true : false
  let lastPage = page >= totalPage ? true : false

  let pagesSelect = useMemo(() => {
    let options = []
    for (let i = 1; i <= totalPage; i++) {
      options.push({ text: i, value: i })
    }

    return options
  }, [totalPage])

  return (
    <div className="flex flex-wrap justify-between items-center">
      <div className="flex items-center">
        {showPerPage && (
          <>
            <div className="relative mr-3">
              <Select
                name="perpage-select"
                value={perPage}
                items={perPageSelect}
                onChange={(e) => onChangePerPage(parseInt(e.target.value))}
                className="py-1 font-normal border"
              />
            </div>

            <p className="font-base text-gray-700">
              Showing {from} - {to} {`${totalPage > 1 ? `of ${total}` : ''}`}
            </p>
          </>
        )}
      </div>
      <div className="flex items-center">
        <div className="text-gray-800 inline-block font-base mr-3">
          Page {`${page} ${totalPage > 1 ? `of ${totalPage}` : ''}`}
        </div>

        {totalPage > 1 && (
          <div className="mr-3">
            <Select
              name="page-select"
              value={page}
              items={pagesSelect}
              onChange={(e) => onChangePage(parseInt(e.target.value))}
              className="py-1 font-normal border"
            />
          </div>
        )}

        {!firstPage && (
          <>
            <button onClick={() => onChangePage(1)} className="btn btn-gray ml-1">
              First
            </button>
            <button onClick={() => onChangePage(page - 1)} className="btn btn-gray ml-1 w-20">
              Prev
            </button>
          </>
        )}
        {!lastPage && (
          <>
            <button onClick={() => onChangePage(page + 1)} className="btn btn-gray ml-1 w-20">
              Next
            </button>
            <button onClick={() => onChangePage(totalPage)} className="btn btn-gray ml-1">
              Last
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Pagination
