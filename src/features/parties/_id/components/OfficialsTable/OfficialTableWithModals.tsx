import React, { lazy, Suspense } from 'react'

import OfficialTable from './OfficialTable'

const ModalAddPicture = lazy(() => import('./components/ModalAddPicture'))

interface Props {
  //
}

const OfficialTableWithModals: React.FC<Props> = () => {
  return (
    <>
      <OfficialTable />

      <Suspense fallback={null}>
        <ModalAddPicture />
      </Suspense>
    </>
  )
}

export default OfficialTableWithModals
