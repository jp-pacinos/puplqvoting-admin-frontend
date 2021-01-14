import React from 'react'
import useSessionStorageFilters from './useSessionStorageFilters'

import { SearchFilters } from './components'
import OfficialsAddTableWithFetcher from './OfficialsAddTableWithFetcher'

interface Props {
  //
}

const OfficialsAddTableWithFilters: React.FC<Props> = () => {
  const useFilters = useSessionStorageFilters()

  return (
    <>
      <div className="flex flex-wrap items-center mb-5">
        <div className="w-full lg:w-auto lg:mr-3 mb-2 lg:mb-0">
          <h4 className="text-blue-500 font-medium leading-loose">Search:</h4>
        </div>
        <SearchFilters useFilters={() => useFilters} />
      </div>

      <OfficialsAddTableWithFetcher useFilters={() => useFilters} />
    </>
  )
}

export default OfficialsAddTableWithFilters
