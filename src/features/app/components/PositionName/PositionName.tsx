import React from 'react'
import { EntityId } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { selectPositionById } from 'features/app/appSlice'

interface Props {
  id: EntityId
}

const PositionName: React.FC<Props> = ({ id }) => {
  const position = useSelector((state) => selectPositionById(state, id))

  return <>{position ? position.name : '-'}</>
}

export default PositionName
