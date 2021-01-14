import React from 'react'

import { EditModal, DeleteModal, GroupEditModal, GroupDeleteModal } from './components'
import StudentsWithFetcher from './StudentsWithFetcher'

interface Props {
  //
}

const StudentsWithModals: React.FC<Props> = () => {
  return (
    <>
      <StudentsWithFetcher />

      {/* modals here */}
      <EditModal />
      <DeleteModal />
      <GroupEditModal />
      <GroupDeleteModal />
    </>
  )
}

export default StudentsWithModals
