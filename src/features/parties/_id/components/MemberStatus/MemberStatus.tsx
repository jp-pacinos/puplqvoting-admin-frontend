import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { groupBy } from 'lodash'

import { Fade } from 'common/components/Transitions'
import { selectPositions } from 'features/app/appSlice'
import { selectOfficialEntities } from 'features/parties/_id/slice'

interface Props {
  //
}

const MemberStatus: React.FC<Props> = () => {
  const positions = useSelector(selectPositions)
  const officials = useSelector(selectOfficialEntities)

  const [openOthers, setOpenOthers] = useState(false)

  let { required, optional } = useMemo(() => {
    const officialsByPosition = groupBy(officials, 'position_id')

    let list: { required: React.ReactNode[]; optional: React.ReactNode[] } = {
      required: [],
      optional: [],
    }

    for (let i = 0; i < positions.length; i++) {
      let position = positions[i]
      if (!officialsByPosition[position.id]) {
        list.optional.push(
          <p
            key={position.id}
            className="bg-blue-400 text-white text-sm font-semibold rounded-full px-3 leading-loose mr-1"
          >
            {`No ${position.name}`}
          </p>
        )
        continue
      }

      let officialCount = officialsByPosition[position.id].length
      if (officialCount > position.per_party_count) {
        list.required.push(
          <p
            key={position.id}
            className="bg-red-400 text-white text-sm font-semibold rounded-full px-3 leading-loose mr-1"
          >
            {`${officialCount} ${position.name}`}
          </p>
        )
        continue
      }

      if (officialCount !== position.per_party_count) {
        list.required.push(
          <p
            key={position.id}
            className="bg-yellow-400 text-white text-sm font-semibold rounded-full px-3 leading-loose mr-1"
          >{`${officialCount}/${position.per_party_count} ${position.name}`}</p>
        )
      }
    }

    return list
  }, [officials, positions])

  if (required.length === 0 && optional.length === 0) return null

  return (
    <>
      <div className="flex flex-wrap">{required}</div>

      {optional.length !== 0 && (
        <button
          onClick={() => setOpenOthers((prev) => !prev)}
          className="btn bg-gray-200 text-gray-500 hover:bg-gray-300 py-0 text-sm font-semibold focus:outline-none rounded-full px-3 leading-loose mr-1"
        >
          {openOthers ? 'Less info...' : 'More info...'}
        </button>
      )}

      <Fade in={openOthers} className="flex flex-wrap">
        {optional}
      </Fade>
    </>
  )
}

export default MemberStatus
