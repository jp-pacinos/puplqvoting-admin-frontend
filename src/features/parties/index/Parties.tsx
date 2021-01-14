import React, { Dispatch, SetStateAction } from 'react'

import { RequestStatus } from 'api/types'
import { Search } from 'common/components'
import { SelectElection } from 'features/app/components'

import { PartyLists, ButtonPartyAdd } from './components'

interface Props {
  status: RequestStatus
  usePage: () => [number, Dispatch<SetStateAction<number>>]
  useSearch: () => [[string, string], Dispatch<SetStateAction<string>>]
  useElection: () => [string, Dispatch<SetStateAction<string>>]
}

const Parties: React.FC<Props> = ({ status, usePage, useSearch, useElection }) => {
  const [[search], setSearch] = useSearch()
  const [election, setElection] = useElection()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleElectionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setElection(e.target.value)
  }

  return (
    <>
      <div className="flex flex-wrap justify-between items-center my-3 md:my-5">
        <div className="flex-grow flex items-center mr-3 mb-3 sm:mr-0 sm:mb-0">
          <div className="w-8/12 lg:w-5/12">
            <Search value={search} onChange={handleSearch} placeholder="Search party..." />
          </div>

          <div className="ml-3 w-4/12 lg:w-auto">
            <SelectElection
              placeholder="All Elections"
              value={election}
              onChange={handleElectionSelect}
            />
          </div>
        </div>

        <div className="ml-0 sm:ml-3">
          <ButtonPartyAdd />
        </div>
      </div>

      {status === 'success' && (
        <div className="md:mb-10">
          <PartyLists usePage={usePage} />
        </div>
      )}

      {status === 'pending' && (
        <div className="text-center">
          <p className="my-10 text-gray-500 font-semibold">Loading...</p>
        </div>
      )}
    </>
  )
}

export default Parties
