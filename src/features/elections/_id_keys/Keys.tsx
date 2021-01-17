import React from 'react'

import {
  Filters,
  ButtonExportRecords,
  KeysTable,
  KeysTableGroupActions,
  ModalGroupDeleteKey,
} from './components'

interface Props {}

const Keys: React.FC<Props> = () => {
  return (
    <>
      <div className="my-3">
        <Filters />
      </div>

      <div className="card">
        <div className="flex justify-between mb-3 items-center">
          <h4 className="text-blue-600 font-medium leading-loose">Student Keys</h4>
          <ButtonExportRecords />
        </div>
        <KeysTable />
      </div>

      {/* group actions */}
      <KeysTableGroupActions />

      {/* modals */}
      <ModalGroupDeleteKey />
    </>
  )
}

export default Keys
