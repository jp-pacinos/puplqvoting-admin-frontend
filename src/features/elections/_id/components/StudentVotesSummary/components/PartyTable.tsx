import React from 'react'
import { useSelector } from 'react-redux'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import { ApiResponse } from 'api/elections'
import { selectPositions } from 'features/app/appSlice'
import { selectOfficialById } from 'features/elections/_id'

import fullname from 'common/utils/fullname'

interface Props extends React.ComponentPropsWithoutRef<'table'> {
  data: ApiResponse.OfficialWithVotes[]
}

const PartyTable: React.FC<Props> = ({ data }) => {
  const positions = useSelector(selectPositions)
  const officialsByPosition = groupBy(data, 'position_id')

  let totalVotes = 0
  let OfficialsListRender = positions.map((ps) => {
    if (isEmpty(officialsByPosition)) return null
    if (!get(officialsByPosition, ps.id)) return null

    return officialsByPosition[ps.id].map(({ id, votes }) => {
      totalVotes += votes

      return (
        <tr key={id}>
          <td>{ps.name}</td>
          <td>
            <OfficialFullname officialId={id} />
          </td>
          <td>{votes}</td>
        </tr>
      )
    })
  })

  return (
    <table className="table table-lg stripped election-comparisons-table border">
      <thead className="border-2 border-gray-200">
        <tr>
          <th className="w-2/6">Position</th>
          <th className="w-3/6">
            Fullname <span className="text-gray-500 text-xs font-semibold">LN/FN/MI</span>
          </th>
          <th className="w-1/6 text-center">Votes</th>
        </tr>
      </thead>
      <tbody>{OfficialsListRender}</tbody>
      <tfoot>
        <tr>
          <td colSpan={3} className="text-right">
            {totalVotes} Total
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default PartyTable

interface OfficialFullnameProps extends React.ComponentPropsWithoutRef<'span'> {
  officialId: number
}

const OfficialFullname: React.FC<OfficialFullnameProps> = ({ officialId }) => {
  const official = useSelector((state) => selectOfficialById(state, officialId))

  return <>{official ? fullname(official.student) : '-'}</>
}
