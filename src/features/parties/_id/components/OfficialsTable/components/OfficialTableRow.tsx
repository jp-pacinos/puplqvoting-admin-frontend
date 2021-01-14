import React, { memo, forwardRef } from 'react'
import { EntityId } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlinePicture, AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'

import { IconButton } from 'common/components/Core'
import { CourseAcronym, SelectPositions } from 'features/app/components'
import {
  selectOfficialById,
  removeOfficial,
  updateOfficialPosition,
  officialPictureModalOpen,
} from 'features/parties/_id'
import fullname from 'common/utils/fullname'

interface Props extends React.ComponentPropsWithRef<'tr'> {
  officialId: EntityId
}

const OfficialTableRow: React.FC<Props> = forwardRef(({ officialId }, ref) => {
  const official = useSelector((state) => selectOfficialById(state, officialId))
  const dispatch = useDispatch()

  if (!official) {
    return null
  }

  const onChangePosition = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      updateOfficialPosition({ officialId: official.id, positionId: parseInt(e.target.value) })
    )
  }

  const onClickRemove = () => {
    dispatch(removeOfficial({ partyId: official.party_id, officialId: official.id }))
  }

  const onClickPicture = () => {
    dispatch(officialPictureModalOpen({ officialId }))
  }

  let name = fullname(official.student)
  let removingStyle = official.removing ? 'hidden' : undefined

  return (
    <tr ref={ref} className={removingStyle}>
      <td>
        <IconButton
          onClick={onClickRemove}
          className="text-red-500 bg-red-50 hover:bg-red-500 hover:text-white"
        >
          <AiOutlineClose />
        </IconButton>
      </td>
      <td>
        <SelectPositions
          value={official.position_id}
          onChange={onChangePosition}
          placeholder={!official.position_id ? 'Select Position' : undefined}
          className="py-1 border-gray-200 font-normal"
        />
      </td>
      <td>{name}</td>
      <td>
        <IconButton
          onClick={onClickPicture}
          className="hover:shadow inline-flex justify-center text-blue-500 bg-blue-50 hover:bg-blue-500 hover:text-white"
        >
          <AiOutlinePicture /> {official.display_picture && <AiOutlineCheck className="ml-2" />}
        </IconButton>
      </td>
      <td>{official.student.student_number}</td>
      <td>
        <CourseAcronym id={official.student.course_id} />
      </td>
    </tr>
  )
})

export default memo(OfficialTableRow)
