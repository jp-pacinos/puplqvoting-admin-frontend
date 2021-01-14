import React, { useCallback } from 'react'

import { Search } from 'common/components'
import { ElectionActive, ElectionLists, ButtonElectionAdd } from './components'

interface Props {
  usePage: [number, React.Dispatch<React.SetStateAction<number>>]
  useSearch: [string, React.Dispatch<React.SetStateAction<string>>]
}

const Election: React.FC<Props> = ({ usePage, useSearch }) => {
  const [page, setPage] = usePage
  const [search, setSearch] = useSearch

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
      setPage(1)
    },
    [setPage, setSearch]
  )

  return (
    <>
      <div className="flex justify-between items-center my-3 md:my-5">
        <div className="flex-grow">
          <div className="md:w-7/12 lg:w-5/12">
            <Search value={search} onChange={handleSearch} placeholder="Search election..." />
          </div>
        </div>

        <div className="ml-3">
          <ButtonElectionAdd />
        </div>
      </div>

      <ElectionActive />

      <ElectionLists usePage={[page, setPage]} />
    </>
  )
}

export default Election
