import React from 'react'

import { ModalAddPicture } from './components'
import OfficialTable from './OfficialTable'

interface Props {
  //
}

const OfficialTableWithModals: React.FC<Props> = () => {
  return (
    <>
      <OfficialTable />

      {/*  */}
      <ModalAddPicture />
    </>
  )
}

export default OfficialTableWithModals
