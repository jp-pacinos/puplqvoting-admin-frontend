import React from 'react'
import { selectPositionEntities } from 'features/app/appSlice'
import { selectOfficials, selectResponseStatus } from 'features/parties/_id'
import { useSelector } from 'react-redux'

import { SlideRight } from 'common/components/Transitions'
import OfficialTableRow from './OfficialTableRow'

interface Props {
  //
}

const OfficialTableRowsWithStatus: React.FC<Props> = () => {
  const positions = useSelector(selectPositionEntities)
  const officials = useSelector(selectOfficials)
  const status = useSelector(selectResponseStatus)

  const newSortedOfficials = officials
    .map((official) => {
      return {
        ...official,
        position_order: positions[official.position_id]?.order,
      }
    })
    .sort((first, second) => first.position_id - second.position_id)

  if (status === 'pending') {
    return (
      <tr>
        <td colSpan={5} className="font-bold text-center text-gray-600">
          Loading...
        </td>
      </tr>
    )
  }

  if (status === 'success') {
    return (
      <>
        {newSortedOfficials.length !== 0 ? (
          newSortedOfficials.map(({ id }, i) => (
            <SlideRight
              key={id}
              delay={25 * i}
              renderComponent={(nodeRef) => <OfficialTableRow ref={nodeRef} officialId={id} />}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5} className="font-bold text-center text-gray-600">
              No records found.
            </td>
          </tr>
        )}
      </>
    )
  }

  return (
    <tr>
      <td colSpan={5} className="font-bold text-center text-gray-600">
        There was an error fetching results.
      </td>
    </tr>
  )
}

export default OfficialTableRowsWithStatus
