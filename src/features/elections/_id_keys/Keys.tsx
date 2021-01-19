import React, { Dispatch, SetStateAction } from 'react'

import { Fade } from 'common/components/Transitions'
import {
  Filters,
  ButtonExportRecords,
  KeysTable,
  KeysTableGroupActions,
  ModalGroupDeleteKey,
} from './components'
import { FilterProps } from './components/Filters'

interface Props {
  usePage: () => [number, Dispatch<SetStateAction<number>>]
  usePerPage: () => [number, Dispatch<SetStateAction<number>>]
  useSearch: () => [string, Dispatch<SetStateAction<string>>]
  useFilters: () => [FilterProps, Dispatch<SetStateAction<FilterProps>>]
}

const Keys: React.FC<Props> = ({ usePage, usePerPage, useSearch, useFilters }) => {
  return (
    <>
      <Fade className="my-3">
        <Filters {...{ useSearch, useFilters }} />
      </Fade>

      <Fade delay={175} className="card">
        <div className="flex justify-between mb-3 items-center">
          <h4 className="text-blue-600 font-medium leading-loose">Student Keys</h4>
          <ButtonExportRecords />
        </div>
        <KeysTable {...{ usePage, usePerPage }} />
      </Fade>

      {/* group actions */}
      <KeysTableGroupActions />

      {/* modals */}
      <ModalGroupDeleteKey />
    </>
  )
}

export default Keys
